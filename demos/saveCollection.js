var db = require('../lib/JSONFS.js');

db.connect('db', ['articles']);
var article = {
    title : 'JSONFS works',
    published : 'today',
    rating : '5 stars'
}

var article2 = {
    title : 'JSONFS works',
    published : 'yesterday',
    rating : '5 stars'
}

var article3 = {
    title : 'JSONFS works',
    published : 'today',
    rating : '4 stars'
}

//var savedArticle = db.articles.save(article);
//var savedArticle = db.articles.save([article]);
var savedArticle = db.articles.save([article, article2, article3]);

console.log(savedArticle);

// run : node saveCollection.js