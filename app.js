var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var expressSess = require("express-session");
//var sleep = require('sleep');
require('./db');
var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var Schema = mongoose.Schema;


const Lists = mongoose.model('Lists');
const User = mongoose.model('User');
var dbResults = false;

app.get('/', function(req, res) {
  Lists.find(function(err, linkObj, count) {
    res.render('index',{routines:linkObj,css_file:"/base.css"});
  });
});
app.get('/routine',function(req,res){
  Lists.find(function(err, linkObj, count) {
  res.render('routine',{routines:linkObj,css_file:"/base.css"});
  });
});

Lists.find({},function(err, linkObj, count) {
  console.log("find callback");
  dbResults = linkObj;
  for(itr in dbResults){
    let obj = dbResults[itr];
    console.log(obj.slug);
    app.get('/' + obj.slug, function(req,res){
      Lists.find({'slug':obj.slug},function(err,linkObj,count){
        let thisObj = linkObj[0];
        console.log(thisObj);
        res.render('routine',{routine:thisObj,css_file:"/base.css"});
      });
    });
  }
});


app.post('/addWorkout', function(req,res) {
  var slug = req.body.slug;
  console.log(slug);
  Lists.find({'slug': slug},function(err, linkObj, count){
    var obj = linkObj[0];
    console.log("object");
    console.log(obj);
    const routine = new Lists({
      name:req.body.name,
      workout:req.body.workout
    });
    Lists.update({_id: obj._id},{$addToSet:{workouts:workout}},function(err, doc) {
      if(!err) {
        res.redirect('/'+ obj.slug);
      } else {
        res.send(err.errors.title.message);
      }
    });

  });
});



app.post('/addRoutine', function(req,res) {
  const routine = new Lists({
    name:req.body.name,
    workout:[req.body.workout]
  });
  routine.save(function(err, doc) {
    if(!err) {
      app.get('/' + doc.slug, function(req,res){
        Lists.find({'slug':doc.slug},function(err,linkObj,count){
          let thisObj = linkObj[0];
          console.log(thisObj);
          res.render('workout',{routine:thisObj,css_file:"/base.css"});
        });
      });
      res.redirect('/');
    } else {
      res.send(err.errors.title.message);
    }
  });
});

app.listen(3000);
