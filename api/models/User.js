// const passportLocalMongoose=require('passport-local-mongoose');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate=require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        required:true
    },
    name:{
        type:String,
        required:true
    }
  });
  userSchema.plugin(findOrCreate);

  userSchema.pre('save', function(next){
      if(!this.isModified('password')){
          return next();
      }
      bcrypt.hash(this.password, 10, (err, passwordHash)=>{
        if(err)
            return next(err);

        this.password=passwordHash;
        next();
      })
  })

  userSchema.methods.comparePassword=function(password, cb){
      bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
      })
  }
  const User = mongoose.model('User', userSchema);

  module.exports = User