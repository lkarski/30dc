
/**
 * Module dependencies.
 */

var express = require('c:/work/projects/express/lib/express');

// Path to our public directory

var pub = __dirname + '/public';

// setup middleware

var app = express();
app.use(app.router);

console.log('__dirname: ', __dirname);

app.use(express.static('css', __dirname + '/css'));
app.use(express.static('js', __dirname + '/js'));
app.use(express.static('img', __dirname + '/img'));

app.use(express.errorHandler());

// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');

app.set('view options', { layout: 'layout.ejs' });

app.get('/', function(req, res){
  res.render('index.ejs', { test: 'hello world!' });
});

app.listen(3000);
console.log('Express app started on port 3000');
