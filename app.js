
/**
 * Module dependencies.
 */

var express = require('express'),
	app = express(),
	expressEjsLayouts = require('express-ejs-layouts'),
	
	// Path to our public directory
	pub = __dirname + '/public';


// setup middleware
app.use(expressEjsLayouts);
app.use(app.router);

console.log('__dirname: ', __dirname);

app.use('/css', express.static('css', __dirname + '/css'));
app.use('/js', express.static('js', __dirname + '/js'));
app.use('/img', express.static('img', __dirname + '/img'));

app.use(express.errorHandler());

// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index.ejs', { test: 'hello world!' });
});

app.get('/create', function(req, res){
	res.render('create.ejs');
});

app.listen(3000);
console.log('Express app started on port 3000');
