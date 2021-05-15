const express = require('express');
const passport = require('passport');
const router = express.Router();
const User=require('../models/User');
const JWT=require("jsonwebtoken");
const passportConfig=require("../passport");

const signToken=(userID)=>{
    return JWT.sign({
        iss:"Aman",
        sub:userID
    }, "AmanMalviya", {expiresIn:"1h"})
}

router.post('/', passport.authenticate('local', {session:false}), function(req, res) {
    if(req.isAuthenticated()){
        const {_id, username, role, name}=req.user;
        const token=signToken(_id);
        res.cookie('access_token', token, {httpOnly:true, sameSite:true});
        res.status(200).json({isAuthenticated:true, user:{username, role, name}});
  }
});

module.exports = router;
