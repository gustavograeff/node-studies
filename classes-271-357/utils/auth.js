const bcrypt = require('bcryptjs');
const path = require('path');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgridMailer = require('@sendgrid/mail');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);
const SENDGRID_API_KEY =
  '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';
sendgridMailer.setApiKey(SENDGRID_API_KEY);

exports.postSignup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { confirmPassword } = req.body;
  console.log(email, password, confirmPassword);
  User.findOne({ email })
    .then((userDOoc) => {
      if (userDOoc) return res.redirect('/signup');
      const SECURITY_LEVEL = 12;
      return bcrypt
        .hash(password, SECURITY_LEVEL)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'gustavo_graeff@hotmail.com',
            subject: 'Test successful!',
            html: '<h1>Hey this is a test with sendmailer using node.js!</h1>'
          });
          /* const msg = {
            to: email,
            from: 'gustavo_graeff@hotmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>'
          };
          return sendgridMailer.send(msg); */
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
