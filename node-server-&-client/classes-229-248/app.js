const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const shop = require('./models/shop');

const MONGO_DB_URL =
  'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/shop';

const filePath = path.dirname(process.mainModule.filename);

const app = express();

const store = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    save: false,
    saveUninitialized: false,
    store
  })
);

app.use('/logout', shop.deleteCookie);

app.use('/', (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true;');
  // const isLoggedIn =
  //   req
  //     .get('Cookie')
  //     .split(';')[0]
  //     .split('=')[1] === 'true';
  // console.log(isLoggedIn);
  // console.log(req);
  req.session.isLoggedIn = true;
  console.log(req.session);
  res.sendFile(path.join(filePath, 'views', 'home.html'));
});

// app.use(shop.deleteCookie);

mongoose
  .connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
