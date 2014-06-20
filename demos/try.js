// in release mode:
// npm install jsonfs
// var db = require('jsonfs');

var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);

console.dir(db);

// run : node try.js