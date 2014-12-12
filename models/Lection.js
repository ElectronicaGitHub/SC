var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Lection = new Schema({
	title: String, 
	description : String, 
	text : String,
	course : {
		type : ObjectId, 
		ref : 'Course'
	},
	image : String,
	video : String
})

module.exports = mongoose.model('Lection', Lection);