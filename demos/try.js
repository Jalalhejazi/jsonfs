// in release mode:
// npm install JSONFS
// var db = require('JSONFS');

var db = require('../lib/JSONFS.js');

db.connect('db', ['articles']);

console.dir(db);

// run : node try.js