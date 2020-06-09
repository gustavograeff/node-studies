const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.send({ name: 'Gustavo' });
});

app.listen(8080);
