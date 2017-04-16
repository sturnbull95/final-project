var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var expressSess = require("express-session");
//var sleep = require('sleep');
require('./db');
var passport = require("passport");
var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var RedisStore = require('connect-redis')(expressSess);

module.exports = function Sessions(url, secret) {
  var store = new RedisStore({ url: url });
  var session = expressSession({
    secret: secret,
    store: store,
    resave: true,
    saveUninitialized: true
  });

  return session;
};

var Schema = mongoose.Schema;
const LocalStrategy = require('passport-local').Strategy
var session = {};
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

app.use(passport.initialize());
app.use(passport.session());
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(expressSess(sessionOptions));

app.get('/restricted',function(req,res){
  if(!req.session.username){
    res.redirect('login');
  }
  else{
    res.render('redirect',{css_file:"/base.css"});
  }
});

app.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/');
});
app.post('/goodWorkout',function(req,res){
  var myWorkout = req.body.workout;
  var myTime = req.body.time;
  if(myWorkout != null){
	res.render('goodWorkout', {css_file:"/base.css",message: "All workouts are great!"});
}
});
  app.post('/login', function(req, res,next) {
      User.findOne({'username':req.body.username},function(err, user,count) {
      if(!err && user) {
          if(bcrypt.hashSync(req.body.password,user.pwSalt) == user.password){
            req.session.regenerate((err) => {
              if (!err) {
                req.session.username = user.username;
                req.session.password = user.password;
              } else {
                console.log('error');
                res.send('an error occurred, please see the server logs for more information');
              }
            });
            req.logIn(user, function(err) {
              res.render('index',{css_file:"/base.css",username:user.username});
            });
          }
          else{
            res.render('login', {message:'Your login or password is incorrect.',css_file:"/base.css"});
          }
      } else {
        res.render('login', {message:'Your login or password is incorrect.',css_file:"/base.css"});
      }
    });
      });

app.post('/register', function(req, res) {
  var user = req.body.username;
  var pw = req.body.password;

  User.findOne({'username': user}, function(err, what){
    if(!err) {
        if(what != null) {
            console.log("NO");
            res.render('index', {error: ["User already exists"]});
          } else if(pw.length < 8) {
            console.log("NO");
            res.render('index', {error: ["Password Length is too small"]});
        } else {

            bcrypt.hash(pw, 10, function(err, hash) {
                // Store hash in your password DB.

                  const newUser = new User({
                    username:req.body.username,
                    password:hash,
                 });

                  newUser.save(function(err, doc) {
                   if(!err) {
                    req.session.regenerate((err) => {
                         if (!err) {
                             req.session.username = newUser.username;
                            console.log(req.session);
                            console.log(newUser.username);
                            //res.render('questions', {summoner: req.session.username});
                          } else {
                              console.log('error');
                              res.send('an error occurred, please see the server logs for more information');
                          }
                    });
                   } else {
                           console.log(err);
                      res.send(err);
                   }
                  })
            });
          }
    } else {
        console.log(err);
              res.send(err);
    }
  });

  });


app.get('/',function(req,res){
  res.render('home',{css_file:"/base.css"});
});
app.get('/aboutMe',function(req,res){
  res.render('about',{css_file:"/base.css"});
});
app.get('/home',function(req,res){
  res.render('index',{css_file:"/base.css"});
});

app.get('/register',function(req,res){
  res.render('register',{css_file:"/base.css"});
});
app.get('/login',function(req,res){
  res.render('login',{css_file:"/base.css"});
});
app.get('/goodWorkout',function(req,res){
  res.render('goodWorkout',{css_file:"/base.css"});
});

app.listen(process.env.PORT || 3000);
