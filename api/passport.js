const express = require('express');
const app = express();
const passport=require('passport');
const LocalStrategy=require("passport-local").Strategy;
const JWTStrategy=require("passport-jwt").Strategy;
const User=require("./models/User");
// const passportLocalMongoose=require("passport-local-mongoose");

app.use(passport.initialize());

const cookieExtractor=req=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies['access_Token'];
    }
    return token;
}

//to authorize
passport.use(new JWTStrategy({
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