var bodyParser=require('body-parser');
var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db=mongoose.connection;

var routes=require('./routes/index');
var users=require('./routes/users');

var app=express();

//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({extname:'handlebars',defaultLayout:'layout', layoutsDir:'views/layouts'}));
 // engine named as handlebars
app.set('view engine','handlebars'); // setting the view engine to what its named
/*so we have set handlebar files with extension .handlebars which will be present in the views folder
and the default handlebar file will be layout.handlebars i.e. response to get('/') request 
until we dont overwrite it */

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
	secret: 'secret',
	saveUninitialized:true,
	resave:true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace=param.split('.'),
		root=namespace.shift(),
		formParam=root;

		while(namespace.length){
			formParam+='['+namespace.shift()+']';
		}
		return {
			param:formParam,
			msg:msg,
			value:value
		};
	}    
}));

//connect flash
app.use(flash());

//Global Vars
app.use(function(req,res,next){
	res.locals.success_msg=req.flash('success_msg');
	res.locals.error_msg=req.flash('error_msg');
	res.locals.error=req.flash('error');
	next();
});

app.use('/',routes);
app.use('/users',users);

//Set Server
app.listen(3000,function(){
	console.log('Server started on port 3000');
});
