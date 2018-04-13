var os = require('os');
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
	
app.post('/performROSAction', (req, res) => {
	//console.log("performing ROS action...");

	var client = new net.Socket();
	client.connect(PORT, HOST, function(){
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	    // Write a message to the socket as soon as the client is connected
	    // the server will receive it as message from the client 

	    var ROSAction = JSON.stringify(req.body);
		if(client.write(ROSAction)){
	    	console.log("Data flushed successfully");
	    }else{
	    	console.log("Unsuccessful");
    	}
		/*if(client.write(ROSAction.length + '\n' + ROSAction + '\n')){
	    	console.log("Data flushed successfully");
	    }else{
	    	console.log("Unsuccessful");
    	}*/
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
	    //console.log('DATA: ' + data);
	    res.setHeader('Content-Type', 'application/json');
	    /*response has to be in the form of a JSON*/
	    
	    res.end(data);
	    /*Sending the respone back to the angular Client */

	    // Close the client socket completely
	    client.destroy();
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
	    console.log('Connection closed');
	});

});

app.listen(8080);

console.log("Listening on port 8080")


