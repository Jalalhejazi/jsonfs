/*
 * collection --> DAL
 *
 * Copyright (c) 2014 Jalal Hejazi
 * Licensed under the MIT license.
 */


var util = require('./util'),
    path = require('path'),
    uuid = require('node-uuid');

module.exports = function(db, collectionName) {
    var DAL = {};
    DAL.collectionName = collectionName;
    DAL._f = path.join(db._db.path, (collectionName + '.json'));

    DAL.find = function(query) {
        var collection = JSON.parse(util.readFromFile(this._f));
        if (!query) {
            return collection;
        } else {
            return util.finder(collection, query, true);
        }
    };

    DAL.findOne = function(query) {
        var collection = JSON.parse(util.readFromFile(this._f));
        if (!query) {
            return collection[0];
        } else {
            return util.finder(collection, query, false)[0];
        }
    };

    DAL.save = function(data) {
        var collection = JSON.parse(util.readFromFile(this._f));
        if (typeof data === 'object' && data.length) {
            if (data.length === 1) {
                if (data[0].length > 0) {
                    data = data[0];
                }
            }
            var retCollection = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];
                d._id = uuid.v4().replace(/-/g, '');
                collection.push(d);
                retCollection.push(d);
            }
            util.writeToFile(this._f, collection);
            return retCollection;
        } {
            data._id = uuid.v4().replace(/-/g, '');
            collection.push(data);
            util.writeToFile(this._f, collection);
            return data;
        }
    };

    DAL.update = function(query, data, options) {
        var ret = {},
            collection = JSON.parse(util.readFromFile('./' + path.join(db._db.path, (collectionName + '.json'))));
        var records = util.finder(collection, query, true);
        if (records.length) {
            if (options && options.multi) {
                collection = util.updateFiltered(collection, query, data, true);
                ret.updated = records.length;
                ret.inserted = 0;
            } else {
                collection = util.updateFiltered(collection, query, data, false);
                ret.updated = 1;
                ret.inserted = 0;
            }
        } else {
            if (options && options.upsert) {
                data._id = uuid.v4().replace(/-/g, '');
                collection.push(data);
                ret.updated = 0;
                ret.inserted = 1;
            } else {
                ret.updated = 0;
                ret.inserted = 0;
            }
        }
        util.writeToFile(this._f, collection);
        return ret;
    };

    DAL.remove = function(query, multi) {
        if (query) {
            var collection = JSON.parse(util.readFromFile(this._f));
            if (typeof multi === 'undefined') {
                multi = true;
            }
            collection = util.removeFiltered(collection, query, multi);

            util.writeToFile(this._f, collection);
        } else {
            util.removeFile(this._f);
            delete db[collectionName];
        }
        return true;
    };

    DAL.count = function() {
        return (JSON.parse(util.readFromFile(this._f))).length;
    };

    return DAL;
};
