var os = require('os');
var http = require("http");
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
/* Handling the AngularJS post request*/
var net = require('net');
var app = express();


var HOST = os.hostname();
//var HOST = '10.140.169.116';
var PORT = 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'app')));

/* GET home page. */
app.get('/', function(req, res, next) {
  	//Path to the main file
	res.status(200).sendFile(path.join(__dirname+'../app/index.html')); 
});	

app.post('/launchROS', (req, res) => {
	handlePost(req,res,'/LaunchROS');
});

app.post('/checkROS', (req, res) => {
	handlePost(req,res,'/CheckROSLive');
});

app.post('/executePlan', (req,res) => {
	console.log("Executing plan...");
	handlePost(req,res,'/ExecutePlan');
});

app.post('/exit', (req,res) => {
	handlePost(req,res,'/Exit');
});

function handlePost(req, res, ROSPath){
	var rosAction = JSON.stringify(req.body);

	var options = {
		hostname: HOST,
		port: 9999,
		path: ROSPath,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': rosAction.length,
		}
	};

	var req = http.request(options, function(res) {
		console.log('Status: ' + res.statusCode);
	  console.log('Headers: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (body) {
	    console.log('Body: ' + body);
	  });
	});

	req.on('error', function(e) {
  	console.log('problem with request: ' + e.message);
	});
	// write data to request body
	req.write(rosAction);
	req.end();
}

app.listen(8080);
console.log("Listening on port 8080")


