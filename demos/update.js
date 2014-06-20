var db = require('../lib/jsonfs.js');

db.connect('db', ['articles']);
var article = {
    title : 'jsonfs works',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);

var query = {
	title : 'jsonfs works'
};

var dataToBeUpdate = {
	title : 'jsonfs works again!',
};

var options = {
	 multi: false,
	 upsert: false
};

var updated = db.articles.update(query, dataToBeUpdate, options);
console.log(updated); // { updated: 1, inserted: 0 }

// run : node update.js