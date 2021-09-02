const mongoose = require('mongoose');

const PowSchema = new mongoose.Schema({
	id:{
		type:Number
	},
	gameweek:{
		type: Number
	},
	gameweekPoints:{
		type: Number
	},
	totalPoints:{
		type: Number
	},
	transfersIn:{
		type: Array
	},
	transfersOut:{
		type: Array
	},
	pointsSpent:{
		type: Number
	},
	chipsUsed:{
		type: String
	},
	bank:{
		type: Number
	},
	overallRank:{
		type: Number
	}
});

module.exports = mongoose.model('Pow', PowSchema)