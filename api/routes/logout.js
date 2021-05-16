const express=require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next){
    res.clearCookie('access_token');
    res.json({user:{username:"", role:"", name:""}, success:true});
})

module.exports=router;