var mongoose = require('mongoose');
var companySchema = new mongoose.Schema({
	name: String,
	profile: String,
	ctc: Number,
	min_cgpa: Number,
	applicants: [String]
});

module.exports = mongoose.model('tblcompany',companySchema);