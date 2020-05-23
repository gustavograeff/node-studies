const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Shop = require('./routes/shop');
const User = require('./models/user');
const Product = require('./models/product');

const book = {
  title: 'test gustavo',
  price: 12.75,
  imageUrl: 'testUrl',
  description: 'test description'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  console.log(req.user, 'dos lokooo');
  req.user
    .createProduct({
      title: book.title,
      price: book.price,
      imageUrl: book.imageUrl,
      description: book.description
    })
    .then((result) => next())
    .catch((err) => console.log(err));
});

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: 'Gustavo', email: 'g@g.com' });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// Shop.getAllProducts();
// Shop.getProductById();
// Shop.postProduct();
Shop.deleteProduct();
