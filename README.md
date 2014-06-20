# jsonfs (JSON FileDB like MongoDB)
Nodejs JSON Database like MongoDB, but only using the FileSystem (File IO).

<br>
### db.collection.save()

<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/db.save.png" alt="">

<br>
### db.collection.findOne()
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/db.findOne.png" alt="">


<br>
### db.collection.find({})
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/db.find.png" alt="">


<br>
### db.collection.update({})
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/db.update.png" alt="">

<br>
### db.collection.remove({})
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/db.remove.png" alt="">

<br>
### db.kursus
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/jsonfs-kursus.png" alt="">



<br>
### node try.js
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/try.png" alt="">


<br>
### collection.js (Data Access Layer)
<img src="https://raw.githubusercontent.com/Jalalhejazi/jsonfs/master/images/collection.js.png" alt="">



## Inspirations and Credits

* [Small JSON file database for Node.js](https://github.com/dreyacosta/somewhere.js)
* [NoSQL JSON-Database mongoDB](http://www.mongodb.org/)


##Contents

* [Getting Started](#getting-started)
* [Documentation](#documentation)
  * [Connect](#connect-to-db)
  * [Load Collections](#load-collections)
  * [Write/Save](#writesave-to-collection)
  * [Read](#read-from-collection)
  * [Update](#update-collection)
  * [Remove](#remove-collection)
  * [Count](#count)
* [demos](#demos)
* [Performance](#performance)
* [Contributing](#contributing)
* [Release History](#release-history)

## Getting Started
clone the source code locally :
```bash
$ git clone https://github.com/Jalalhejazi/jsonfs.git
```

Install the module locally :
```bash
$ npm install json_file_system
```

```js
var db = require('jsonfs');
db = db.connect('/path/to/db-folder', ['collection-name']);
// you can access the traditional JSON DB methods here
```

## Documentation
### Connect to DB
```js
db.connect(pathToFolder, ['filename']);
```
Filename will be the name of the JSON file. You can omit the extension, jsonfs will take care of it for you.

```js
var db = require('jsonfs');
db = db.connect('/demos/db', ['articles']);
// or simply
db.connect('/demos/db', ['articles']);
```

This will check for a directory at given path, if it does not exits, jsonfs will throw an error and exit.

If the directory exists but the file/collection does not exist, jsonfs will create it for you.

### Load Collections
Alternatively you can also load collections like

```js
var db = require('jsonfs');
// this
db = db.connect('/demos/db');
db.loadCollections(['articles']);
//or
db.connect('/demos/db');
db.loadCollections(['articles']);
//or
db.connect('/demos/db')
  .loadCollections(['articles']);
//or
db.connect('/demos/db', ['articles']);
```
#### Load Multiple Collections

```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles','comments','users']);
```


### Write/Save to Collection
```js
db.collectioName.save(object);
```
Once you have loaded a collection, you can access the collection's methods using the dot notation like

```js
db.[collectionName].[methodname]
```
To save the data, you can use
```js
var db = require('jsonfs');
db.connect('db', ['articles']);
var article = {
    title : "jsonfs works",
    published : "today",
    rating : "5 stars"
}
db.articles.save(article);
// or
db.articles.save([article]);
```
The saved data will be
```js
[
    {
        "title": "jsonfs works",
        "published": "today",
        "rating": "5 stars",
        "_id": "0f6047c6c69149f0be0c8f5943be91be"
    }
]
```
You can also save multiple objects at once like

```js
var db = require('jsonfs');
db.connect('db', ['articles']);
var article1 = {
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
db.articles.save([article1, article2, article3]);
```
And this will return the inserted objects

```js
[ { title: 'jsonfs works',
    published: 'today',
    rating: '4 stars',
    _id: 'b1cdbb3525b84e8c822fc78896d0ca7b' },
  { title: 'jsonfs works',
    published: 'yesterday',
    rating: '5 stars',
    _id: '42997c62e1714e9f9d88bf3b87901f3b' },
  { title: 'jsonfs works',
    published: 'today',
    rating: '5 stars',
    _id: '4ca1c1597ddc4020bc41b4418e7a568e' } ]
```

### Read from Collection
There are 2 methods available for reading the JSON collection
* db.collectioName.find(query)
* db.collectioName.findOne(query)


#### db.collectioName.find()
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.find();
```
This will return all the records
```js
[{
    title: 'jsonfs works',
    published: 'today',
    rating: '5 stars',
    _id: '0f6047c6c69149f0be0c8f5943be91be'
}]
```
You can also query with a criteria like
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.find({rating : "5 stars"});
```
This will return all the articles which have a rating of 5.

#### db.collectioName.findOne(query)
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.findOne();
```

If you do not pass a query, jsonfs will return the first article in the collection. If you pass a query, it will return first article in the filtered data

```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.findOne({_id: '0f6047c6c69149f0be0c8f5943be91be'});
```
### Update Collection
```js
db.collectioName.update(query, data, options);
```

You can also update one or many objects in the collection
```js
options = {
    multi: false, // update multiple - default false
    upsert: false // if object is not found, add it (update-insert) - default false
}
```
Usage
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);

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
```

### Remove Collection
```js
db.collectioName.remove(query, multi);
```
You can remove the entire collection (including the file) or you can remove the matched objects by passing in a query. When you pass a query, you can either delete all the matched objects or only the first one by passing `multi` as `false`. The default value of `multi` is `true`.

```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.remove({rating : "5 stars"});
```
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.remove({rating : "5 stars"}, true); // remove all matched. Default - multi = true
```

```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.remove({rating : "5 stars"}, false); // remove only the first match
```
Using remove without any params will delete the file and will remove the db instance.
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.remove();
```
After the above operation `db.articles` is `undefined`.

### Count
```js
db.collectioName.count();
```
Will return the count of objects in the Collection
```js
var db = require('jsonfs');
db.connect('/demos/db', ['articles']);
db.articles.count(); // will give the count
```

## demos
Refer to the [demos](demos) folder.

## Performance
To validate jsonfs's performance and to check if it meets your needs, you can clone this repo and run

```bash
$ node performance/time.js
```
An average of few tests can be found below

#### Time taken to process x number of objects (in ms) vs Action Performed

<table>
    <tr>
        <td></td>
        <td>1 (object)</td>
        <td>1000 (objects)</td>
        <td>10000 (objects)</td>
        <td>100000 (objects)</td>
        <td>1000000 (objects)</td>
    </tr>
    <tr>
        <td>Save</td>
        <td>1 (ms)</td>
        <td>15 (ms)</td>
        <td>137 (ms)</td>
        <td>1782 (ms)</td>
        <td>14425 (ms)</td>
    </tr>
    <tr>
        <td>Find all without query</td>
        <td>0 (ms)</td>
        <td>2 (ms)</td>
        <td>12 (ms)</td>
        <td>204 (ms)</td>
        <td>2923 (ms)</td>
    </tr>
    <tr>
        <td>Find all with query</td>
        <td>0 (ms)</td>
        <td>2 (ms)</td>
        <td>17 (ms)</td>
        <td>738 (ms)</td>
        <td>1985 (ms)</td>
    </tr>
    <tr>
        <td>Find one without query</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>9 (ms)</td>
        <td>791 (ms)</td>
        <td>1676 (ms)</td>
    </tr>
    <tr>
        <td>Find one with query</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>8 (ms)</td>
        <td>219 (ms)</td>
        <td>1410 (ms)</td>
    </tr>
    <tr>
        <td>Update all records</td>
        <td>1 (ms)</td>
        <td>7 (ms)</td>
        <td>61 (ms)</td>
        <td>206 (ms)</td>
        <td>48035 (ms)</td>
    </tr>
    <tr>
        <td>Get count</td>
        <td>0 (ms)</td>
        <td>3 (ms)</td>
        <td>11 (ms)</td>
        <td>260 (ms)</td>
        <td>2420 (ms)</td>
    </tr>
    <tr>
        <td>Remove with query</td>
        <td>0 (ms)</td>
        <td>7 (ms)</td>
        <td>59 (ms)</td>
        <td>984 (ms)</td>
        <td>48191 (ms)</td>
    </tr>
    <tr>
        <td>Remove collection</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>4 (ms)</td>
        <td>52 (ms)</td>
        <td>154 (ms)</td>
    </tr>
    <tr>
        <td>File size</td>
        <td>0.000111 (MB)</td>
        <td>0.116671 (MB)</td>
        <td>1.196671 (MB)</td>
        <td>12.266671 (MB)</td>
        <td>125.666671 (MB)</td>
    </tr>
</table>


## Contributing
See the [CONTRIBUTING Guidelines](CONTRIBUTING.md)

## Release History
* 0.0.1
  * Base Module with
    * Connect to a Folder
    * Access a Collection/File
    * Create Read Update Delete on JSON object

## License
Copyright (c) 2014 Jalal Hejazi. Licensed under the MIT license.