var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Lector = new Schema({
	name : String,
	description : String,
	avatar : String,
	subjects : String,
	courses : [{
		type : ObjectId, 
		ref : 'Course'
	}]
})

module.exports = mongoose.model('Lector', Lector);