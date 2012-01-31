var main = require(__dirname+'/../main.js'),assert = require('assert');

var range = main.rgbRange(10,200,50);

console.log('range format');
console.log("\t",range);

assert.ok(range.g1);
assert.ok(range.r2);
assert.ok(range.b1 < range.b2);

