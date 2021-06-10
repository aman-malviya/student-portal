require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors=require("cors");
const mongoose=require("mongoose");
// const passportLocalMongoose=require('passport-local-mongoose');


const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logOutRouter=require('./routes/logout');
const authenticateRouter=require("./routes/authenticate")
const googleAuthRouter=require('./routes/googleAuth')
const googleAuthCallbackRouter=require('./routes/googleAuthCallback')
const facebookAuthRouter=require('./routes/fbAuth')
const facebookAuthCallbackRouter=require('./routes/fbAuthCallback')
const linkedinAuthRouter=require('./routes/linkedinAuth')
const linkedinAuthCallbackRouter=require('./routes/linkedinAuthCallback')

const app = express();

//Mongoose Connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Mongoose database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose properly connected');
});



app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logOutRouter);
app.use('/authenticate', authenticateRouter);
app.use('/auth/google', googleAuthRouter);
app.use('/auth/google/authenticate', googleAuthCallbackRouter);
app.use('/auth/facebook', facebookAuthRouter);
app.use('/auth/facebook/authenticate', facebookAuthCallbackRouter);
app.use('/auth/linkedin', linkedinAuthRouter);
app.use('/auth/linkedin/authenticate', linkedinAuthCallbackRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
