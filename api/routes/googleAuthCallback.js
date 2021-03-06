const express=require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', 
  passport.authenticate('google',{ failureRedirect: 'http://localhost:3000/auth' }),
  function(req, res) {
    res.redirect("http://localhost:3000");
  });

module.exports=router;