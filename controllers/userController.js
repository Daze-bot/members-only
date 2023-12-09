const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username_lower: username.toLowerCase() });
      if (!user) {
        return done(null, false, { message: "User not found" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'sign_up_form',
    nav_content: 'user_nav',
    title: "Create New User",
    errors: undefined,
    first_name: "",
    last_name: "",
    username: "",
  });
});

exports.sign_up_post = [
  body('firstName', "First Name must not be empty.")
    .trim()
    .isLength({ min: 1 }),
  body('lastName', "Last Name must not be empty.")
    .trim()
    .isLength({ min: 1 }),
  body('username', "Username must not be empty.")
    .trim()
    .isLength({ min: 1 }),
  body('username', "Username must only contain letters and numbers")
    .trim()
    .isAlphanumeric(),
  body('password', "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 }),
  body('passwordConfirmation', "Passwords must match")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = [];

    const userExists = await User.findOne({ username_lower: req.body.username.toLowerCase() }).collation({ locale: "en", strength: 2 }).exec();

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        username_lower: req.body.username.toLowerCase(),
        password: hashedPassword,
        admin: false,
      });

      const validationErrors = validationResult(req).array();

      if (userExists) {
        errors.push("Username already in use. Please choose a new username");
        user.username = "";
        user.username_lower = "";
      } else {
        validationErrors.forEach(err => {
          errors.push(err.msg);
        });
      }

      if (errors.length > 0) {
        res.render('index', {
          block_content: 'sign_up_form',
          nav_content: 'user_nav',
          title: "Create New User",
          errors: errors,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,         
        });
        return;
      } else {
        await user.save();
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      }
    });
  }),
] ;

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'log_in_form',
    nav_content: 'user_nav',
    title: "Log In",
    errors: undefined,
    username: "",
  });
});

exports.log_in_post = [
  body("username", "Please enter username")
    .trim()
    .isLength({ min: 1 }),
  body("password", "Please enter password")
    .trim()
    .isLength({ min: 1 }),
  
  asyncHandler(async (req, res, next) => {
    const errors = [];

    const validationErrors = validationResult(req).array();

    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.render('index', {
        block_content: 'log_in_form',
        nav_content: 'user_nav',
        title: "Log In",
        errors: errors,
        username: req.body.username,
      });
      return;
    } else {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          errors.push(info.message);
          res.render('index', {
            block_content: 'log_in_form',
            nav_content: 'user_nav',
            title: "Log In",
            errors: errors,
            username: req.body.username,
          });
        } else {
          req.login(user, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect('/');
          });
        }
      })(req, res, next);
    }
  }),
];

exports.log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});