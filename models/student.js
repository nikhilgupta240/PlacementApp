var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
	name: String,
	department: String,
	rollno: Number,
	cgpa: Number
});

module.exports = mongoose.model('tblstudent',studentSchema);