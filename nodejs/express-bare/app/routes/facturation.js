var express = require('express');
var router = express.Router();

//import mongodb package
var mongodb = require("mongodb");

//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://mongo:27017/Azure";
//DB Object
var dbObject;
//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;
//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  findData({}, res);
});

function findData(filters, response){
    // var facturationData = [];
    dbObject.collection('Facturation').find(filters).toArray(function(err, items) {
      if ( err ) throw err;
      response.send(items);
    });

}


module.exports = router;
