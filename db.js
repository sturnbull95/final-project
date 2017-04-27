//initial schema

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');

 var bcrypt = require('bcryptjs');
 if (process.env.NODE_ENV === 'PRODUCTION') {
  // if we're in PRODUCTION mode, then read the configration from a file
  // use blocking file io to do this...
  var fs = require('fs');
  var path = require('path');
  var fn = path.join(__dirname, 'config.json');
  var data = fs.readFileSync(fn);

  // our configuration file will be in json, so parse it and set the
  // conenction string appropriately!
  var conf = JSON.parse(data);
  var dbconf = conf.dbconf;
 } else {
  // if we're not in PRODUCTION mode, then use
  dbconf = 'mongodb://localhost/smt430';
 }


var Lists = new mongoose.Schema({
  workout: String,
  length: Number,
  user: String
});
var User = new mongoose.Schema({
  username: {type:String, unique:true},
  password: String,
	pwSalt: String
});
var Comments = new mongoose.Schema({
  user: String,
	content: String
});

User.methods.generateHash = function(password) {
	console.log(bcrypt);
    let salt = bcrypt.genSaltSync();
    console.log(salt);
    return {salt:salt, hash: bcrypt.hashSync(password, salt, null)};
};
//
// Lists.plugin(URLSlugs('name'));
mongoose.model('Lists', Lists);
mongoose.model('User', User);
mongoose.model('Comments', Comments);
mongoose.Promise = global.Promise;
mongoose.connect(dbconf);
