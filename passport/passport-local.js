"use strict";

const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, res, done) => {
      User.findOne({ "email": req.body.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(
            null,
            false,
            req.flash("error", "User with email already exist.")
          );
        }

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encrypPassword(req.body.password);

        newUser.save((err) => {
          done(null, newUser);
        });
      });
    }
  )
);
