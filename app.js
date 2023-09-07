const express = require('express');
const path = require('path')
const app = express();
const passport = require('passport');
const mongoose = require('mongoose')
require('dotenv').config()
const session = require("express-session");

const MongoStore = require('connect-mongo');
const authRouter = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
app.set('views',path.resolve(__dirname + '/views') )
app.set('view engine', 'ejs')

// app.use('/', apiRouter)
// express session 연결
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:'secretsessionkey',
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // MongoDB 연결 URL
      })
  }));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRouter);




let PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});