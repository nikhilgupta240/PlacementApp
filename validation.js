var validator = require('validator');

/*  checks whether a text contains only alphabets(i.e. a-z, A-z) and spaces
	@params {text} text to be checked
	@return is text valid or not on the above condition.
*/
function isTextAlpha(text){
	if(typeof text == 'undefined'){
		return false;
	}
	var words = text.split(" ");
	var status = true;
	words.forEach(function(word){
		if(!validator.isAlpha(word)){
			status = false;
			console.log("Name is not valid");
		}
	});
	return status;
}

/*  checks whether a text contains only alphabets(i.e. a-z, A-z) and spaces
	@params {text} text to be checked
	@return is text valid or not on the above condition.
*/
function isTextAlphaNumeric(text){
	if(typeof text == 'undefined'){
		return false;
	}
	var words = text.split(" ");
	var status = true;
	words.forEach(function(word){
		if(!validator.isAlphanumeric(word)){
			status = false;
			console.log("Name is not valid");
		}
	});
	return status;	
}

module.exports = {
	isStudentValid: function(req){
		var response = {
			code: 200,
			status: true,
			message: "Data is valid"
		}
		try{
			if(!isTextAlpha(req.body.name)){							//  validate input name
				response.message = 'Please enter Alphabets only for name'			
				response.status = false;
				response.code = 400;

		    }else if(!isTextAlpha(req.body.department)){		// validate input department
		    	response.message = 'Please enter Alphabets only for department';
		    	response.status = false;
		    	response.code = 400;

		    }else if((typeof req.body.rollno == 'undefined') || (!validator.isInt(req.body.rollno))){					// validates roll number of student
		    	response.message = 'Please enter Integer only for roll number';
		    	response.status = false;
		    	response.code = 400;

		    }else if((typeof req.body.cgpa == 'undefined') || (!validator.isFloat(req.body.cgpa)) || (req.body.cgpa > 10) || (req.body.cgpa < 0)) {			// validates cgpa of student
		    	response.message = 'Please enter number in range 0 to 10 only for cgpa';
		    	response.status = false;
		    	response.code = 400;
		    }
		}catch(e){
			response.status = false;
			response.code = 500;
			response.message = e.message;
			var error = "isStudentValid: " + e.message;
			console.log(error);
		}	
		console.log(response.message);
		return response;	
	},

	isCompanyValid: function(req){
		var response = {
			code: 200,
			status: true,
			message: "Data is Valid"
		}
		try{
			if(!isTextAlphaNumeric(req.body.name)){
				response.message = "Please enter Alphabets or numbers for name, no special characters";
				response.status = false;
				response.code = 400;

			}else if(!isTextAlphaNumeric(req.body.profile)){
				response.message = "Please enter alphabets only for profile";
				response.status = false;
				response.code = 400;

			}else if((typeof req.body.ctc == 'undefined') || (!validator.isFloat(req.body.ctc)) || (req.body.ctc < 0)){
				response.message = "Please enter number greater than 0 for ctc";
				response.status = false;
				response.code = 400;

			}else if((typeof req.body.mincgpa == 'undefined') || (!validator.isFloat(req.body.mincgpa)) || (req.body.mincgpa > 10) || (req.body.mincgpa < 0)){
				response.message = "Please enter number in range 0 to 10 for minimum cgpa";
				response.status = false;
				response.code = 400;
			}
		}catch(e){
			response.status = false;
			response.code = 500;
			response.message = e.message;
			var error = "isCompanyValid: " + e.message;
			console.log(error);
		}

		console.log(response.message);
		return response;
	}
}