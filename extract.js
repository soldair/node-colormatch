var spawn = require("child_process").spawn;

exports.imageMagick = function (path, cb) {
  var convert = spawn("convert", [
      path,
      "-colors",
      "16",
      "-depth",
      "8",
      "-format",
      "%c",
      "histogram:info:-",
    ]),
    out = "",
    err = "";

  convert.stdout.on("data", function (data) {
    out += data.toString();
  });

  convert.stderr.on("data", function (data) {
    err += data.toString();
  });

  // a big note. exit may be fired before or after close of stdout (0.8.20)
  // to respond properly in any lib using spawn you really need to wait for both.
  var exit,
    closed,
    done = function () {
      if (exit === undefined) process.exit(9);
      err = exit ? (err ? err : exit) : false;
      var colors;
      if (!err) {
        colors = parseImagickColors(out);
        if (!colors.length) {
          console.log("no colors from parse:", out);
        }
      }
      cb(exit ? (err ? err : exit) : false, colors);
    };

  convert.on("exit", function (code) {
    exit = code;
    if (closed) done();
  });

  convert.stdout.on("close", function () {
    closed = true;
    if (exit !== undefined) done();
  });

  convert.stdin.end();
};

//
//a valid color object response is []
//
function parseImagickColors(colorString) {
  var totalPixels = 0;

  var rows = colorString.split("\n").reduce((acc, str) => {
    parts = str
      .trim()
      .replace(/([(]) |(,) |:( )/g, "$1$2$3")
      .split(" ");

    if (parts.length >= 2) {
      var count = +parts[0];
      totalPixels += count;
      return acc.concat({
        pixels: count,
        rgba: parts[1].split(","),
        hex: parts[2],
      });
    }

    return acc;
  }, []);

  return rows.map((color) => {
    return {
      percent: (color.pixels * 100) / totalPixels,
      rgb: color.rgb,
    };
  });
}
