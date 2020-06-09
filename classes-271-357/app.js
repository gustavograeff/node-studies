const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const auth = require('./utils/auth');

const MONGO_DB_URL =
  'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/users';

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

app.use('/login', (req, res, next) => {
  res.sendFile(path.join(filePath, 'views', 'login.html'));
});

app.use('/signup', (req, res, next) => {
  res.sendFile(path.join(filePath, 'views', 'signup.html'));
});

app.use('/create', auth.postSignup);

app.use('/home', (req, res, next) => {
  res.sendFile(path.join(filePath, 'views', 'home.html'));
});

app.use('/', (req, res, next) => {
  res.redirect('/home');
  // next();
});

mongoose
  .connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
