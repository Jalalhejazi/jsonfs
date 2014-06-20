var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);
var article = {
    title : 'jsonfs works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count());
//db.articles.remove();
//db.articles.remove({rating : '5 stars'});
//db.articles.remove({rating : '5 stars'}, true);
db.articles.remove({rating : '5 stars'}, false);
console.log(db.articles.count());
// run : node remove.js