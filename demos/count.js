// in release mode:
// npm install jsonfs
// var db = require('jsonfs');

var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);
var article = {
    title : 'jsonfs works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count()); // will be 1

// run : node count.js