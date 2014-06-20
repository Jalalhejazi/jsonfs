var db = require('../lib/JSONFS.js');

db.connect('db', ['articles']);
var article = {
    title : 'JSONFS works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);

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
console.log(updated); // { updated: 1, inserted: 0 }

// run : node update.js