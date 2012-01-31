var extract = require(__dirname+'/extract.js'),
    match = require(__dirname+'/colormatch.js');


module.exports = {
  //
  //  extract libraries
  //    .imageMagick(path to image,cb);
  //
  extract:extract,
  //
  // color match constructor. if you need tailored tollerances make a new one of these.
  //  new ColorMatch(options)
  //    valid options are
  //      tollerance: default 15
  //        this is the window around a colors data points that will allways match. adds fuzzyness to matcher.
  ColorMatch:match.ColorMatch,
  //
  // is a color a close visual match of the other color?
  //
  // rgb as an array with at least 3 values
  // [r,g,b]
  // this matching algo becomes fuzzier as it approches grey. which is logical because greys are more visually simmilar. 
  //
  quickMatch:function(rgb1,rgb2){
    return match.quickMatch(rgb1,rgb2);
  },
  //
  // rgbRange
  //
  rgbRange:function(r,g,b){
    return match.rgbRange(r,g,b) ;     
  }
};
