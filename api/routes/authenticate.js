const express=require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next){
    const {username, role, name}=req.user;
    res.json({user:{username, role, name},isAuthenticated:true});
})

module.exports=router;