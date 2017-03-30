//initial schema

var user = new mongoose.Schema{
  username: String,
  hash: String,
  lists: [Lists]
}

var Lists = new mongoose.Schema{
	name: String,
	length: Number
	}