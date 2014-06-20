var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);
var article = {
    title : 'jsonfs works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
var foundArticles = db.articles.find();
//var foundArticles = db.articles.find({rating : '5 stars'});

console.log(foundArticles);

// run : node findAll.js