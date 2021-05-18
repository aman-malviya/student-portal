const express = require('express');
// const passport = require('passport');
const router = express.Router();
const User=require('../models/User');

router.post('/', function(req, res, next) {
  const {username, password, role, name}=req.body;

  User.findOne({username},(err, user)=>{
    if(err){
      res.status(500).json({message:{msgBody:"Error has occured", msgError:true}});
    }
    if(user){
      res.status(400).json({message:{msgBody:"You're already registered. Try signing in.", msgError:true}});
    }else{
      const newUser=new User({username, password, role, name});
      newUser.save(err=>{
        if(err){
          res.status(500).json({message:{msgBody:"Error has occured", msgError:true}});
        }else{
          res.status(201).json({message:{msgBody:"Account successfully created.", msgError:false}});
        }
      })
    }
  })
});

module.exports = router;
