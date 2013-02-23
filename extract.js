var spawn = require('child_process').spawn;


exports.imageMagick = function(path,cb){

  var convert = spawn('convert',[path,'-colors','16','-depth','8','-format', '%c', 'histogram:info:-']),
      out = "", 
      err = ""; 

  convert.stdout.on('data',function(data){
    out += data.toString();
  }); 

  convert.stdout.on('data',function(data){
    err += data.toString();
  }); 

  // a big note. exit may be fired before or after close of stdout (0.8.20)
  // to respond properly in any lib using spawn you really need to wait for both.
  var exit,closed
  , done = function(){
    if(exit === undefined) process.exit(9);    
    err = exit?(err?err:exit):false;
    var colors;
    if(!err){
      colors = parseImagickColors(out);
      if(!colors.length){
        console.log('no colors from parse:',out);
      }   
    }   
    cb(exit?(err?err:exit):false,colors); 
  };  

  convert.on('exit',function(code){
    exit = code;
    if(closed) done();
  }); 

  convert.stdout.on('close',function(){
    closed = true;
    if(exit !== undefined) done(); 
  }); 

  convert.stdin.end();

}


//
//a valid color object response is []
//
function parseImagickColors(colorString){

  var totalPixels = 0;

  var rows = [];
  colorString.split("\n").forEach(function(str){
      parts = str.trim().replace(/([(]) |(,) |:( )/g,'$1$2$3').split(' ');
      if(parts.length >= 2) {
        var count = +parts[0];
        var rgb = parts[1];
        totalPixels += count;
        rows.push({pixels:count,rgb:rgb.replace(/[)(]/g,'').split(',')});
      }
  });
  
  var out = [];
  rows.forEach(function(color,k){
    out.push({
      percent:(color.pixels*100)/totalPixels,
      rgb:color.rgb
    });
  });
  
  return out;
}




