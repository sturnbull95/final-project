//initial schema

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// schema tells mongoose the types that are allowed in a collection

var Lists = new mongoose.Schema({
	name: String,
	workout: [String]
});
var User = new mongoose.Schema({
  username: String,
  hash: String,
  lists: [Lists]
});

Lists.plugin(URLSlugs('name'));
mongoose.model('Lists', Lists);
mongoose.model('User', User);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/hw05');
