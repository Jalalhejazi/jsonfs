// in release mode:
// npm install JSONFS
// var db = require('JSONFS');

var db = require('../lib/JSONFS.js');

db.connect('db', ['articles']);
var article = {
    title : 'JSONFS works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count()); // will be 1

// run : node count.js