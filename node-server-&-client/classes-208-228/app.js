const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('mongodb');
// const mongoConnect = require('./utils/database').mongoDbConnect;
const mongoose = require('mongoose');
const Product = require('./models/product');

const book = {
  title: 'test gustavo',
  price: 12.75,
  imageUrl: 'testUrl',
  description: 'test description'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   const product = new Product({
//     title: book.title,
//     price: book.price,
//     description: book.description,
//     imageUrl: book.imageUrl
//   });
//   product
//     .save()
//     .then((result) => {
//       console.log('Product Created!');
//     })
//     .catch((error) => console.log(error));
//   next();
// });

// app.use((req, res, next) => {
//   const product = new Product({
//     title: book.title,
//     price: book.price,
//     description: book.description,
//     imageUrl: book.imageUrl
//   });
//   Product.find()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => console.log(error));
//   next();
// });

// app.use((req, res, next) => {
//   const product = new Product({
//     title: book.title,
//     price: book.price,
//     description: book.description,
//     imageUrl: book.imageUrl
//   });
//   Product.findById('5ecba7e7a728ba24fe46ddc1')
//     .then((result) => {
//       console.log(result);
//       result.title = 'Gustavo Rico!';
//       return result.save();
//     })
//     .then((result) => console.log('Product updated!'))
//     .catch((error) => console.log(error));
//   next();
// });

app.use((req, res, next) => {
  Product.deleteOne({ _id: '5eccf6698ad10623bb0548dd' })
    .then((result) => {
      console.log('Product removed!');
    })
    .catch((error) => console.log(error));
  next();
});

const MONGO_DB_URL =
  'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/shop?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Shop.getAllProducts();
// Shop.getProductById();
// Shop.postProduct();
