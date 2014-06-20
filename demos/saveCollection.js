var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);
var article = {
    title : 'jsonfs works',
    published : 'today',
    rating : '5 stars'
}

var article2 = {
    title : 'jsonfs works',
    published : 'yesterday',
    rating : '5 stars'
}

var article3 = {
    title : 'jsonfs works',
    published : 'today',
    rating : '4 stars'
}

//var savedArticle = db.articles.save(article);
//var savedArticle = db.articles.save([article]);
var savedArticle = db.articles.save([article, article2, article3]);

console.log(savedArticle);

// run : node saveCollection.js