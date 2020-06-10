const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feedRoutes');

const app = express();

app.use(bodyParser.json());

app.use((res, rex, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.listen(8080);
