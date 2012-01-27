var extract = require(__dirname+'/../extract.js');

console.log(extract);

extract.imageMagick(__dirname+'/nodelogo.png',function(err,data){
    console.log('error: ',err);
    console.log('data: ',data);
});

