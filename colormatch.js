var spawn = require('childprocess').spawn;


var match = new ColorMatch();

//
//pass colormatch constrictor if you require different options 
//
exports.ColorMatch = ColorMatch;

//
//expects rgb arrays as arguments [r,g,b]
//
exports.quickMatch = function(rgb1,rgb2){
  return match.quickMatch(rgb1,rgb2);
}


//
//returns range of argb values that are visually simmilar.
//
exports.rgbRange = function(r,g,b){
  return match.rgbRange(r,g,b);
}

//
//for colormatch in the garment domain i found it important to ignore colors that were greater than 59% of the image. the garments had fixed backgrounds etc.
//It depends on your domain what kind of rule you apply to colors based on the quantity of them in the image. 
//for garment images on a consistent background i found that i would not color match and color greater than 59% of an image
//

//
//as an example in sql use rgb ranges like
//"(imageIndex.r>"+r1+" AND imageIndex.r<"+r2+" AND imageIndex.g>"+g1+" AND imageIndex.g<"+g2+" AND imageIndex.b>"+b1+" AND imageIndex.b<"+b2+")";
//i found this structure worked well with and index on r,g, and b for each image color.
//

function ColorMatch(options) {
  options = options||{};
  this.tollerance = options.tollerance||this.tollerance;
}

ColorMatch.prototype = {
  tollerance:15,
  quickMatch:function (rgb1,rgb2){
    var rgb_cmp = this.rgbRange(rgb2[0]||0,rgb2[1]||0,rgb2[2]||0),
      r = rgb1[0]||0,
      g = rgb1[1]||0,
      b = rgb1[2]||0;
    
    
    if(r>rgb_cmp.r1 && r<rgb_cmp.r2 && g>rgb_cmp.g1 && g<rgb_cmp.g2 && b>rgb_cmp.b1 && b<rgb_cmp.b2){
      return true;
    }
    return false;
  },
  rgbRange:function (r,g,b){
    var max = Math.max(r,g,b),
        rOffset = Math.round((max-r)/3 > this.bubble?(max-r)/3:this.tollerance),
        gOffset = Math.round((max-g)/3 > this.bubble?(max-g)/3:this.tollerance),
        bOffset = Math.round((max-b)/3 > this.bubble?(max-b)/3:this.tollerance);
    
    res = {};
    
    res.r1 = (r-rOffset)>0?(r-rOffset):0;
    res.r2 = (r+rOffset)<255?(r+rOffset):255;
    
    res.g1 = (g-rOffset)>0?(g-gOffset):0;
    res.g2 = (g+rOffset)<255?(g+gOffset):255;
    
    res.b1 = (b-rOffset)>0?(b-rOffset):0;
    res.b2 = (b+rOffset)<255?(b+rOffset):255;
    
    return $res;
  }
};

