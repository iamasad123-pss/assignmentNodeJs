const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profile: ['id', 'displayName'],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          res.status(404).json({
            success: false,
            error: err,
          });
        }

        if (user) {
          done(null, user);
          res.status(200).json({
            user,
          });
        } else {
          user = new User({
            facebookId: profile.id,
            name: profile.displayName,
          });
          user.save(function (err) {
            if (err) {
              res.status(404).json({
                success: false,
                error: err,
              });
            } else {
              console.log('saving user ...');
              done(null, user);
              res.status(200).json({
                user,
              });
            }
          });
        }
      });
    }
  )
);

router.use(passport.initialize());
router.use(passport.session());

router.get('/home', (req, res) => {
  res.status(200).json({ user: user });
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/api/v1/user/home');
  }
);

module.exports = router;
