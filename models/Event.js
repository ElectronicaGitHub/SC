var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Event = new Schema({
	lection : {
		type : ObjectId, 
		ref : 'Lection'
	},
	cost : Number,
	payId : String,
	date_start : Date,
	date_end : Date,
	time : String,
	form : String
})

module.exports = mongoose.model('Event', Event);