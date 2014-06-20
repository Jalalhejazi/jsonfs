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
//save
var savedArticle = db.articles.save(article);
console.log(savedArticle);

//findAll
var foundArticles = db.articles.find();
console.log(foundArticles);

foundArticles = db.articles.find({rating : '5 stars'});
console.log(foundArticles);

//findOne
var foundArticles = db.articles.findOne();
console.log(foundArticles);

foundArticles = db.articles.findOne({rating : '5 stars'});
console.log(foundArticles);

//update
var query = {
	title : 'JSONFS works'
};

var dataToBeUpdate = {
	title : 'JSONFS works again!',
};

var options = {
	 multi: false,
	 upsert: false
};

var updated = db.articles.update(query, dataToBeUpdate, options);
console.log(updated);

// after update
foundArticles = db.articles.findOne({rating : '5 stars'});
console.log(foundArticles);

//count
console.log(db.articles.count());

//remove
db.articles.remove({rating : '5 stars'});
db.articles.remove();

// db.articles does not exist anymore!

// run : node all.js