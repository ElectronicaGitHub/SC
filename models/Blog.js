var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var Blog = new Schema({
	title : String, 
	description : String,
	text : String,
	date : {
		type : Date,
		default : Date.now
	}
});
module.exports = mongoose.model('Blog', Blog);