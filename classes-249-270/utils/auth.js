const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../models/user');

const filePath = path.dirname(process.mainModule.filename);

exports.postSignup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { confirmPassword } = req.body;
  console.log(email, password, confirmPassword);
  User.findOne({ email })
    .then((userDOoc) => {
      console.log('userdoc', userDOoc);
      if (userDOoc) return res.redirect('/signup');
      const SECURITY_LEVEL = 12;
      return bcrypt
        .hash(password, SECURITY_LEVEL)
        .then((hashedPassword) => {
          console.log(hashedPassword);
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
        });
    })

    .catch((err) => console.log(err));
};
