var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var Advertise = new Schema({
	background : String, 
	title : String,
	description : String,
	payId : String,
	cost : Number
});
module.exports = mongoose.model('Advertise', Advertise);