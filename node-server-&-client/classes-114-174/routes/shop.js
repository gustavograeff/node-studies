const sequelize = require('../util/database');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      // console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductById = (req, res, next) => {
  Product.findByPk(1)
    .then((product) => {
      // console.log(product);
    })
    .catch((err) => console.log(err));
};

exports.postProduct = (req, res, next) => {
  Product.findByPk(1)
    .then((product) => {
      product.title = 'Atualizado2';
      product.price = 20.95;
      return product.save();
    })
    .then((response) => {
      // console.log('product updated');
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  // const productId = req.body.product;
  Product.findByPk(2)
    // eslint-disable-next-line consistent-return
    .then((product) => {
      if (product) return product.destroy();
    })
    .then((response) => {
      // console.log('product destroyed');
    })
    .catch();
};
// exports.getProductById = (req, res, next) => {
//   Product.findAll({
//     where: {
//       id: 1
//     }
//   })
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// };
