const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
// const mongodb = require('mongodb');
// const mongoConnect = require('../utils/database');

// const { getDb } = mongoConnect;

// class Product {
//   constructor(title, price, description, imageUrl, id) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     if (this._id) {
//       this.title = 'Gustavo É Rico!';
//       return db
//         .collection('products')
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { title: this.title } }
//         )
//         .then((result) => console.log(result))
//         .catch((error) => console.log(error));
//     }
//     return db
//       .collection('products')
//       .insertOne(this)
//       .then((result) => console.log(result))
//       .catch((error) => console.log(error));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => console.log(products))
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: prodId })
//       .next();
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => console.log('Deleted!'))
//       .catch((error) => console.log(error));
//   }
// }

// module.exports = Product;
