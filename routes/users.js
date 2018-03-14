var express=require('express');
var router=express.Router();

//Register
router.get('/register',function(req,res){
	res.render('register',{title:': Register'});
});

//Login
router.get('/login',function(req,res){
	res.render('login',{title:': Login'});
});

router.get('/logout',function(req,res){
	res.render('logout',{title:': logged out'});
});

router.post('/register',function(req,res){
	var name= req.body.name;
	var username= req.body.username;
	var email= req.body.email;
	var password= req.body.password;
	var password2= req.body.password2;

	//Validation
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('password','password is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	if(errors){
		res.render('register',{errors:errors});
	}
	else{
		console.log('No errors - PASSED');
	}
});

module.exports=router;