'use strict';

var jsonfs = require('../lib/jsonfs.js');
var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
    Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var dbPath = 'test/db',
    collection = ['articles'],
    collections = ['comments', 'rating'],
    article = {
        title: 'jsonfs works',
        published: 'today'
    },
    article2 = {
        title: 'jsonfs works',
        published: 'yesterday'
    };

exports.connectNload = {
    setUp: function(done) {
        deleteFolderRecursive(dbPath);

        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        done();
    },
    'connect : ': function(test) {
        test.expect(1);
        test.equal(typeof(jsonfs.connect(dbPath, collection)[collection[0]]), 'object',
            'Successfully Connected and collection instantiated');
        test.done();
    },
    'loadCollections : ': function(test) {
        test.expect(3);
        // connect to DB
        jsonfs.connect(dbPath);
        // load single collecion
        test.equal(jsonfs.loadCollections(collection)[collection[0]].collectionName, collection[0],
            'Loading single collection');
        //load multiple collections
        test.equal(jsonfs.loadCollections(collections)[collections[0]].collectionName, collections[
            0], 'Loading multiple collection');
        test.equal(jsonfs.loadCollections(collections)[collections[1]].collectionName, collections[
            1], 'Loading multiple collection');
        test.done();
    },
    tearDown: function(callback) {
        // remove collections
        jsonfs.loadCollections(collections);
        jsonfs[collections[0]].remove();
        jsonfs[collections[1]].remove();
        callback();
    },
};

exports.count = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);

        done();
    },
    'count : ': function(test) {
        test.expect(2);
        test.equal(jsonfs.articles.count(), 0, 'Count should be 0');
        jsonfs.articles.save(article);
        jsonfs.articles.save(article2);
        test.equal(jsonfs.articles.count(), 2, 'Count should be 2');
        test.done();
    },
};

exports.saveData = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);

        done();
    },
    'save : ': function(test) {
        test.expect(2);
        test.equal(jsonfs.articles.count(), 0, 'No records before save');
        test.equal(jsonfs.articles.save(article).title, article.title,
            'One record should get saved');
        test.done();
    },

    'save multiple: ': function(test) {
        test.expect(3);
        test.equal(jsonfs.articles.count(), 0, 'No records before save');
        test.equal(jsonfs.articles.save([article]).length, 1, 'One record should get saved');
        test.equal(jsonfs.articles.save([article, article2]).length, 2,
            'Two records should get saved');
        test.done();
    },
};

exports.findAll = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);
        done();
    },

    'findAll : ': function(test) {
        test.expect(3);
        //save two record
        jsonfs.articles.save(article);
        jsonfs.articles.save(article2);

        test.equal(jsonfs.articles.find().length, 2, 'Should find two records');
        // find with a query
        test.equal(jsonfs.articles.find({
            title: 'jsonfs works'
        }).length, 2, 'Should find two records with query');
        // no record should be returned when the query does not match any records
        test.equal(jsonfs.articles.find({
            title: 'dummy text'
        }).length, 0, 'Should find no records');

        test.done();
    },
};

exports.findOne = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);
        done();
    },

    'findOne : ': function(test) {
        var query = 'jsonfs works';
        test.expect(3);
        //save two record
        jsonfs.articles.save(article);
        jsonfs.articles.save(article2);

        test.equal(jsonfs.articles.findOne().published, 'today', 'Should return the first record');
        // find with a query
        test.equal(jsonfs.articles.findOne({
            title: query
        }).title, query, 'Should find One record on query');
        // no record should be returned when the query does not match any records
        test.equal(jsonfs.articles.find({
            title: 'dummy text'
        }).title, undefined, 'No records should be found');

        test.done();
    },
};

exports.update = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);
        done();
    },

    'update : ': function(test) {
        var query = {
            'published': 'today'
        };
        var options = {
            'multi': false,
            'upsert': false
        };

        test.expect(4);
        //save one record
        jsonfs.articles.save(article);
        // before update
        test.equal(jsonfs.articles.findOne().published, article.published,
            'Should return the same record as inserted');
        // after update
        test.equal(jsonfs.articles.update(query, article2, options).updated, 1,
            'Should return the updated objects count');

        //change options
        query = {
            'dummy': 'not found'
        };
        options = {
            'multi': false,
            'upsert': true
        };
        // should insert
        test.equal(jsonfs.articles.update(query, article2, options).inserted, 1,
            'Should return the inserted objects count');

        //change options
        query = {
            published: 'yesterday'
        };

        options = {
            'multi': true,
            'upsert': true
        };

        // should update 2 record
        test.equal(jsonfs.articles.update(query, article, options).updated, 2,
            'Should return the updated objects count');
        test.done();
    },
};

exports.remove = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init jsonfs
        jsonfs.connect(dbPath, collection);
        // remove articles collection
        jsonfs.articles.remove();
        //reinit the collection
        jsonfs.loadCollections(collection);
        done();
    },

    'remove : ': function(test) {
        test.expect(9);
        //save two record
        jsonfs.articles.save(article);
        jsonfs.articles.save(article);
        jsonfs.articles.save(article2);

        //before deletion
        test.equal(jsonfs.articles.count(), 3, 'There should be 3 records in the collection');
        //deletion -- default true
        test.equal(jsonfs.articles.remove({
            'published': 'today'
        }), true, 'Deletion should be successful');
        //after deletion
        test.equal(jsonfs.articles.count(), 1, 'There should be 1 record in the collection');

        //repopulate data
        jsonfs.articles.save(article);
        jsonfs.articles.save(article);

        //deletion -- default true
        test.equal(jsonfs.articles.remove({
            'published': 'today'
        }, true), true, 'Deletion should be successful');
        //after deletion
        test.equal(jsonfs.articles.count(), 1, 'There should be 1 record in the collection');

        //repopulate data
        jsonfs.articles.save(article);
        jsonfs.articles.save(article);

        //deletion -- default true
        test.equal(jsonfs.articles.remove({
            'published': 'today'
        }, false), true, 'Deletion should be successful');
        //after deletion
        test.equal(jsonfs.articles.count(), 2, 'There should be 2 records in the collection');

        //remove the collection completely
        test.equal(jsonfs.articles.remove(), true, 'Deletion should be successful');
        //the collection should not exist any more
        test.equal(jsonfs.articles, undefined, 'collection should be removed');
        test.done();
    },
};

var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            }
            else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};