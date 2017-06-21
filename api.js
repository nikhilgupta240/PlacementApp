var express = require('express');
var router = express.Router();

var validation = require('./validation');

var Student = require('./models/student');
var Company = require('./models/company');

router.use(function(req, res, next){
	console.log("Request received");
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /students
// ------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
router.route('/students')

	 // Register a student (accessed at POST http://localhost:8000/api/students)
	.post(function(req, res) {
		try{
			console.log("POST: Student");
			validationResponse = validation.isStudentValid(req);
		    if(!validationResponse.status){							//  validate input name
	    		res.status(validationResponse.code);
	    		res.send({ message : validationResponse.message});

		    }else{
				var student = new Student();      	// create a new instance of the Student model
		    	student.name = req.body.name;  		// set the students name (comes from the request)
			    student.department = req.body.department;
			    student.rollno = req.body.rollno;
			    student.cgpa = req.body.cgpa;

			    // save the student and check for errors
			    student.save(function(err) {
			        if (err){
			        	res.status(500);
			            res.send(err);
			        }

			        res.status(201);
			        res.json({ message: 'Student created!' });
			    });
		    }
	    }catch(e){
	    	var error = "student/post: " + e.message;
	    	console.log(error);
	    	res.status(500);
	    	res.send(e.message);
	    }
	    
	})

	// get all the students (accessed at GET http://localhost:8000/api/students)
	.get(function(req, res) {
		console.log("GET: Student");
	    Student.find(function(err, students) {
	        if (err){
	        	res.status(500);
	            res.send(err);
            }

	        res.json(students);
	    });
	});

// on routes that end in /students/:student_id
// -------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
router.route('/students/:student_id')

	// get the student with that id (accessed at GET http://localhost:8080/api/students/:student_id)
	.get(function(req, res) {
		console.log("GET: Student_id");
	    Student.findById(req.params.student_id, function(err, student) {
	        if (err){
	        	res.status(500);
	            res.send(err);
	        }
	        
	        res.json(student);
	    });
	})

	// update the student with this id (accessed at PUT http://localhost:8080/api/students/:student_id)
    .put(function(req, res) {
    	console.log("PUT: Student_id");

        // use our student model to find the student we want
        Student.findById(req.params.student_id, function(err, student) {

            if (err){
            	res.status(500);
                res.send(err);
            }

            try{
            	validationResponse = validation.isStudentValid(req);
			    if(!validationResponse.status){							//  validate input name
		    		res.status(validationResponse.code);
		    		res.send({ message : validationResponse.message});

			    }else{
	            	student.name = req.body.name;
		            student.department = req.body.department;
		            student.rollno = req.body.rollno;
			    	student.cgpa = req.body.cgpa;

		            // save the student
		            student.save(function(err) {
		                if (err){
		                	res.status(500);
		                    res.send(err);
		                }

		                res.json({ message: 'Student updated!' });
		            });
	            }
            }catch(e){
            	var error = "student/put: " + e.message;
		    	console.log(error);
		    	res.status(500);
		    	res.send(e.message);
            }
        });
    })

    // Unregister the student with this id (accessed at DELETE http://localhost:8080/api/students/:student_id)
    .delete(function(req, res) {
    	console.log("DELETE: Student_id");
        Student.remove({
            _id: req.params.student_id
        }, function(err, student) {
            if (err){
            	res.status(500);
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });


// on routes that end in /companies
// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------
router.route('/companies')

	 // create a company (accessed at POST http://localhost:8080/api/companies)
	.post(function(req, res) {
		console.log("POST: Companies");
	    try{
	    	var validationResponse = validation.isCompanyValid(req);
	    	if(!validationResponse.status){
	    		res.status(validationResponse.code);
	    		res.send({ message : validationResponse.message });
	    	}else{
	    		var company = new Company();     	 	// create a new instance of the company model
			    company.name = req.body.name;  			// set the company's name (comes from the request)
			    company.profile = req.body.profile;	
			    company.ctc = req.body.ctc;
			    company.min_cgpa = req.body.mincgpa;

			    // save the company and check for errors
			    company.save(function(err) {
			        if (err){
			        	res.status(500);
			            res.send(err);
			        }

			        res.status(201);
			        res.json({ message: 'Company created!' });
			    });
	    	}
	    }catch(e){
	    	var error = "company/post " + e.message;
	    	console.log(error);
	    	res.status(500);
	    	res.send(e.message);
	    }
	})

	// get all the companies (accessed at GET http://localhost:8080/api/companies)
	.get(function(req, res) {
		console.log("GET: Companies");
	    Company.find(function(err, companies) {
	        if (err){
	        	res.status(500);
	            res.send(err);
	        }

	        res.json(companies);
	    });
	});


// on routes that end in /companies/:company_id
// -------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
router.route('/companies/:company_id')

	// get the company with that id (accessed at GET http://localhost:8080/api/companies/:company_id)
	.get(function(req, res) {
	    Company.findById(req.params.company_id, function(err, company) {
	        if (err){
	        	res.status(500);
	            res.send(err);
	        }
	        res.json(company);
	    });
	})

	// update the company with this id (accessed at PUT http://localhost:8080/api/companies/:company_id)
    .put(function(req, res) {

        // use our company model to find the company we want
        Company.findById(req.params.company_id, function(err, company) {

            if (err){
            	res.status(500);
                res.send(err);
            }

            try{
            	validationResponse = validation.isCompanyValid(req);
            	if(!validationResponse.status){
            		res.status(validationResponse.code);
	    			res.send({ message : validationResponse.message });
            	}else{
            		company.name = req.body.name;  // update the compnay's info
		            company.profile = req.body.profile;
				    company.ctc = req.body.ctc;
				    company.min_cgpa = req.body.mincgpa;

		            // save the company
		            company.save(function(err) {
		                if (err){
		                	res.status(500);
		                    res.send(err);
		                }

		                res.json({ message: 'Company updated!' });
		            });
            	}
            }catch(e){
            	var error = "company/put " + e.message;
		    	console.log(error);
		    	res.status(500);
		    	res.send(e.message);
            }

        });
    })

    // Unregister the company with this id (accessed at DELETE http://localhost:8080/api/companies/:company_id)
    .delete(function(req, res) {
        Company.remove({
            _id: req.params.company_id
        }, function(err, company) {
            if (err){
            	res.status(500);
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });


// on routes that end in applications/:company_id/:student_id
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
router.route('/applications/:company_id/:student_id')
	
	.put(function(req, res){
		Company.findById(req.params.company_id, function(err, company){

			if(err){
				res.status(500);
				res.send(err);
			}

			if(company.applicants.indexOf(req.params.student_id)!=-1){
				console.log("Application already submitted");
				res.send({ message: 'Application already submitted'});
			}else{
				Student.findById(req.params.student_id, function(err, student){

					if(err){
						res.status(500);
						res.send(err);
					}

					if(student.cgpa < company.min_cgpa){
						console.log("Student not eligible");
						res.send({ message : 'Student not eligible'});
					}else{
						company.applicants.push(req.params.student_id);
						company.save(function(err){
							if(err){
								res.status(500);
								res.send(err);
							}

							res.status(200);
							res.json({ message: 'Application submitted Successfully!' });
						});
					}
				});
			}
		});
	})

	.delete(function(req, res){
		Company.findById(req.params.company_id, function(err, company){

			if(err){
				res.status(500);
				res.send(err);
			}

			if(company.applicants.indexOf(req.params.student_id)==-1){
				console.log("Application doesn't exist");
				res.send({ message: 'Application does not exist' });
			}else{
				var index = company.applicants.indexOf(req.params.student_id);
				company.applicants.splice(index, 1);

				company.save(function(err){
					if(err){
						res.status(500);
						res.send(err);
					}

					res.status(200);
					res.json({ message: 'Application withdrawn Successfully!' });
				});
			}
		});
	});

module.exports = router;