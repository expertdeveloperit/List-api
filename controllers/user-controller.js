import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/user-model';
import validations from '../helpers/user-helper';
import jwt from 'jsonwebtoken';
import config from '../config/';

module.exports = { 

	login(req, res, next) {
	  let email = req.body.email,
         password = req.body.password;

      if (validations.emailValidation(email) == !true) {
         return res.status(400)
            .json({
               message: 'Email cannot be empty and should be valid format'
            });
      } else if (password) {

         User.findOne({
            email: email
         }, function(err, user) {

            if (err) {
               res.status(500).json({
                  status: false,
                  error: err.message
               });
            }
            if (!user) {
               res.status(401).json({
                  status: false,
                  message: 'Authentication failed'
               });
            } else {
               bcrypt.compare(password, user.password, function(err, isMatch) {
                  if (!isMatch) {
                     return res.status(400).json({
                        status: false,
                        message: "Authentication failed"
                     });
                  } else {
                     var payload = {
                        id: user._id,
                        email:user.email
                     };

                       var token = jwt.sign(payload, config.auth.secret, {
                           expiresIn: '1d'
                        });
                        res.status(200).json({
                           status: true,
                           message: 'Authentication Successfull',
                           token
                        });
                    
                     } 
               });
            }
         });
      } else {
         res.status(200).json({
            status: false,
            message: "Password cannot be empty"
         });
      }
	},

	register(req, res, next) {
	  let email = req.body.email;
      let password = req.body.password;
      let hashedPassword;

      if (validations.emailValidation(email) == !true) {
         return res.status(400)
            .json({
               status: false,
               message: 'Email cannot be empty & should be valid format'
            });
      } else if (password && password.length <= 4) {
         User.findOne({
            email
         }, (err, user) => {
            if (err) {
               return res.status(400).json({
                  status: false,
                  message: 'Error on finding user'
               });
            }
            if (user && user.email === email) {
               return res.status(400).json({
                  status: false,
                  message: 'This email is already registered'
               });
            }
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(password, salt, (err1, hash) => {
                  if (err1) {
                     return res.status(400).json({
                        status: false,
                        message: 'Error on Hashing Password',
                        error: err1.message
                     });
                  }
                  hashedPassword = hash;

                  let newUser = new User({
                     'email': email,
                     'password': hashedPassword
                  });

                  newUser.save((err, theUser) => {
                     if (err) {
                        res.status(500).json({
                           message: 'Something went wrong.Try again.',
                           error: err.message
                        });
                     } else {
                      res.status(200).json({
                         status: true,
                         message: "Account created statusfully."
                      });
                  }
               });
            });
         });
       });
      } else {
         return res.status(400).json({
            status: false,
            message: "Password cannot be empty or send valid format"
         });
      }
	}
};