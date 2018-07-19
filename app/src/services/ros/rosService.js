"use strict"

var ros = {};
//const URL ='http://10.130.229.199:8888'
const URL='http://127.0.0.1:8888'

/* 
 * Connects to a websocket
 */
function connectToServer(){
	var ros = new ROSLIB.Ros({
    url : 'ws://10.140.169.116:9090'
	});

  ros.on('connection', function() {
  	console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
}

/*
 * Calls service to either start or turn off force control
 * @param turnOn
 */
function initForceControl(turnOn) {
	var serviceObj;

	if(turnOn){
		serviceObj = new ROSLIB.Service({
	    ros : ros,
	    name : '/m1n6s300_driver/in/start_force_control',
	    serviceType : 'kinova_msgs/Start'
	  });
	}
	else{
		serviceObj = new ROSLIB.Service({
	    ros : ros,
	    name : '/m1n6s300_driver/in/stop_force_control',
	    serviceType : 'kinova_msgs/Stop'
	  });
	}

  var request = new ROSLIB.ServiceRequest();
  serviceObj.callService(request, function(result) {
    console.log('Result for service call on ' + serviceObj.name + ': ' + result);
  });
}

/*
 * Main function for the rosService factory. Returns an object with the
 * following functions:
 * 	turnOnForceCtrl
 * 	turnOffForceCtrl
 *	getArmPosition
 *	executePlan
 */
function rosWebService($http) {
	
	ros.turnOnForceCtrl = function() {

		var ros = new ROSLIB.Ros({
    url : 'ws://10.140.169.116:9090'
		});

	  ros.on('connection', function() {
	  	console.log('Connected to websocket server.');
	  });

	  ros.on('error', function(error) {
	    console.log('Error connecting to websocket server: ', error);
	  });

	  ros.on('close', function() {
	    console.log('Connection to websocket server closed.');
	  });

	  var serviceObj = new ROSLIB.Service({
	    ros : ros,
	    name : '/m1n6s300_driver/in/start_force_control',
	    serviceType : 'kinova_msgs/Start'
	  });

	  var request = new ROSLIB.ServiceRequest();
	  serviceObj.callService(request, function(result) {
	    console.log('Result for service call on ' + serviceObj.name + ': ' + result);
	  });
	};

	ros.turnOffForceCtrl = function() {
		var ros = new ROSLIB.Ros({
    url : 'ws://10.140.169.116:9090'
		});

	  ros.on('connection', function() {
	  	console.log('Connected to websocket server.');
	  });

	  ros.on('error', function(error) {
	    console.log('Error connecting to websocket server: ', error);
	  });

	  ros.on('close', function() {
	    console.log('Connection to websocket server closed.');
	  });

	  var serviceObj = new ROSLIB.Service({
	    ros : ros,
	    name : '/m1n6s300_driver/in/stop_force_control',
	    serviceType : 'kinova_msgs/Stop'
	  });

	  var request = new ROSLIB.ServiceRequest();
	  serviceObj.callService(request, function(result) {
	    console.log('Result for service call on ' + serviceObj.name + ': ' + result);
	  });
	};


	ros.getArmPosition = function() {
	  return new Promise( function(resolve, reject) {
	  	var ros = new ROSLIB.Ros({
	    url : 'ws://10.140.169.116:9090'
			});

		  ros.on('connection', function() {
		  	console.log('Connected to websocket server.');
		  });

		  ros.on('error', function(error) {
		    console.log('Error connecting to websocket server: ', error);
		  });

		  ros.on('close', function() {
		    console.log('Connection to websocket server closed.');
		  });

		  var listener = new ROSLIB.Topic({
		    ros : ros,
		    name : '/end_effector_position',
		    messageType : 'std_msgs/String'
		    /*
				name : '/m1n6s300_driver/out/cartesian_command',
		    messageType : 'kinova_msgs/KinovaPose'
		    */
		  });

		  listener.subscribe(function(message) {
		    listener.unsubscribe();
		    resolve(message);
		  });
	  });
	}

	// Execute Plan
	ros.executePlan = function(action) {
    var data, config;
    data = action;
    console.log(angular.toJson(action));

    /*
    $http.post('/executePlan', data, config)
    .success(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    })
    .error(function (data, status, header, config) {
        console.log("Error-unable to execute plan.");
    });*/
	};

	ros.optimizePlan = function(data) {
		$http.post(URL + '/OptimizePlan',data)
    .success(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    })
    .error(function (data, status, header, config) {
        console.log("Error, please check how you're making the get request.");
    });
	}

	return ros;
};

export default angular.module("rosService", [])
	.factory('rosWebService', rosWebService);