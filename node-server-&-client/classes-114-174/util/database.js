const Sequelize = require('sequelize/index');

const sequelize = new Sequelize('node_complete', 'root', 'banco10!TOP', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
