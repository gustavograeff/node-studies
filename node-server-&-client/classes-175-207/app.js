const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoConnect = require('./utils/database').mongoDbConnect;
const Product = require('./models/product');

const book = {
  title: 'test gustavo',
  price: 12.75,
  imageUrl: 'testUrl',
  description: 'test description'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const produt = new Product(
    book.title,
    book.price,
    book.description,
    book.imageUrl
  );
  // produt
  //   .save()
  //   .then((result) => {
  //     console.log('Product Created!');
  //   })
  //   .catch((error) => console.log(error));
  next();
});

// app.use((req, res, next) => {
//   console.log(Product.fetchAll());
//   next();
// });

app.use((req, res, next) => {
  Product.findById(new mongodb.ObjectId('5ecba7e7a728ba24fe46ddc1'))
    .then((fetchedProduct) => {
      console.log(fetchedProduct);
      const product = new Product(
        fetchedProduct.title,
        fetchedProduct.description,
        fetchedProduct.price,
        fetchedProduct.imageUrl,
        fetchedProduct._id
      );

      req.id = fetchedProduct._id;

      product.save();
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

// app.use((req, res, next) => {
//   Product.deleteById('5ecbad4e7c97e32e9ce4085d');
//   next();
// });

app.use((req, res, next) => {
  console.log(req.id, 'AAAAAAAAAAAAAAA');
  next();
});

mongoConnect(() => {
  app.listen(3000);
});

// Shop.getAllProducts();
// Shop.getProductById();
// Shop.postProduct();
