const express = require('express');
const app = express();
const passport=require('passport');
const LocalStrategy=require("passport-local").Strategy;
const JwtStrategy=require("passport-jwt").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const findOrCreate=require("mongoose-findorcreate");
require('dotenv').config()

const User=require("./models/User");
// const passportLocalMongoose=require("passport-local-mongoose");

app.use(passport.initialize());
app.use(passport.session());

const cookieExtractor=req=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies['access_token'];
    }
    return token;
}

//to authorize
passport.use(new JwtStrategy({
    jwtFromRequest:cookieExtractor,
    secretOrKey:"AmanMalviya"
}, (payload, done)=>{
    User.findById({_id:payload.sub}, (err, user)=>{
        if(err)
        return done(err, false);

        if(user)
        return done(null, user);
        else
        return done(null, false);
    })
}))

//to authenticate with username and password using local strategy
passport.use(new LocalStrategy((username, password, done)=> {
      User.findOne({username}, (err, user)=> {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'No user exists' });
        }
        // check if password is correct
        user.comparePassword(password, done);
      });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9000/auth/google/authenticate",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id, username:profile.emails[0].value, role:"user", name:profile.displayName }, function (err, user) {
      return done(err, user);
    });
  }
));

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/callback",
//   profileFields: ['id', 'displayName', 'photos', 'email']
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log(profile);
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/facebook/authenticate",
      profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
        User.findOrCreate({ facebookId: profile.id, username:profile.id, role:"user", name:profile.displayName }, function (err, user) {
          return done(err, user);
        });
    }
  )
);

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:9000/auth/linkedin/authenticate",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}));