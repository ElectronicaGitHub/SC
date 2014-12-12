var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Course = new Schema({
	title: String, 
	description : String, 
	text : String,
	image : String, 
	video : String,
	lector : {
		type : ObjectId, 
		ref : 'Lector'
	},
	lections : [{
		type : ObjectId, 
		ref : 'Lection'
	}]
})

module.exports = mongoose.model('Course', Course);