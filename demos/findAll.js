var db = require('../lib/JSONFS.js');

db.connect('db', ['articles']);
var article = {
    title : 'JSONFS works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
var foundArticles = db.articles.find();
//var foundArticles = db.articles.find({rating : '5 stars'});

console.log(foundArticles);

// run : node findAll.js