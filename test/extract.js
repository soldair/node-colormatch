var main = require(__dirname+'/../main.js'),
    assert = require('assert');

var extract = main.extract;


extract.imageMagick(__dirname+'/nodelogo.png',function(err,data){
    if(err){
      console.log('IMAGE MAGICK ERROR ',err);
      process.exit(1);
    }

    console.log('data: ',data);
    assert.ok(data.length == 16);
    assert.ok(data[0].percent);
    assert.ok(data[0].rgb);
});

