var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Shedule = new Schema({
	shedule : [{
		type : ObjectId,
		ref : 'Event'
	}]
})

module.exports = mongoose.model('Shedule', Shedule);