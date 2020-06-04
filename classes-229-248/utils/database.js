const mongodb = require('mongodb/index');

const { MongoClient } = mongodb;

const MONGO_DB_URL =
  'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/shop?retryWrites=true&w=majority';

let _db;

const mongoDbConnect = (callback) => {
  MongoClient.connect(MONGO_DB_URL)
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (!_db) throw new Error('No database found!');

  return _db;
};

exports.mongoDbConnect = mongoDbConnect;
exports.getDb = getDb;
