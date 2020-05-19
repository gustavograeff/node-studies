const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/database');

const app = express();

db.execute('SELECT * FROM products')
  .then((result) => {
    // console.log(result[0], result[1]);
  })
  .catch((err) => {
    // console.log(err);
  });

const book = {
  title: 'test gustavo',
  price: 12.75,
  imageUrl: 'testUrl',
  description: 'test description'
};

db.execute(
  'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
  [book.title, book.price, book.imageUrl, book.description]
);

db.execute('SELECT * FROM products where products.id = ?', [1]).then((response) => {
  console.log(response);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
