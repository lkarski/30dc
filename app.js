
/**
 * Module dependencies.
 */

var express = require('express'),
	mongodb = require('mongodb'),
	app = express(),
	expressEjsLayouts = require('express-ejs-layouts'),
	
	// Path to our public directory
	pub = __dirname + '/public',

	// mongo setup
	Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    mongoServer = new Server("localhost", 27017, {native_parser: true}),
    mongoClient = new MongoClient(mongoServer),

	_end_of_var_;

// middleware
app.use(express.errorHandler());
app.use(expressEjsLayouts);
app.use(express.bodyParser()); // must be called before app.router
app.use(app.router);

// routes for static resources
app.use('/css', express.static('css', __dirname + '/css'));
app.use('/js', express.static('js', __dirname + '/js'));
app.use('/img', express.static('img', __dirname + '/img'));

// views and view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

var getChallenges = function () {
	mongoClient.open(function (err, client) {
		if (err) {
			console.dir(err);
		} else {
			var db = client.db('30dc');

			db.collection('challenges', function (err, collection) {
				collection.find().toArray(function (err, results) {
					console.dir(results);

					client.close();
				});
			});
		}
	});
};

var saveChallenge = function (challenge, onComplete) {
	mongoClient.open(function (err, client) {
		if (err) {
			console.dir(err);
		} else {
			var db = client.db('30dc');

			db.collection('challenges', function (err, collection) {
				collection.insert(challenge, function (err, docs) {
					console.log("err: ", err);
					console.log("docs: ", docs);

					client.close();
					onComplete();
				});
			});
		}
	});
};

// action methods
app.post('/create', function (req, res) {
	var challenge = req.body.challenge;

	console.dir(req.body);

	saveChallenge(challenge, getChallenges);

	res.render('create');
});

app.get('/create', function (req, res){
	res.render('create.ejs');
});

app.get('/', function (req, res) {
  res.render('index.ejs', { test: 'hello world!' });
});

// run Forest, run!
app.listen(3000);
console.log('Express app started on port 3000');
