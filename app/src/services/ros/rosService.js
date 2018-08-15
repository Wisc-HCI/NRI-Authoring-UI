/**
 * rosService
 * Factory object that creates a "rosService" object. 
 * RosService is an object that allows the front end to
 * communicate with the back end. 
 * Should be the main object making rest requests
 */
"use strict"

var ros = {};
const URL ='http://10.130.229.199:8888'


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
	
	// Turns on force control for mico arm
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

	// turns off force control for mico arm
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

	// gets mico arm position
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

	/*
	* Sends action over to therblig backend
	* @params action - JSON object in the format of
	*	 { action: "string" }
	*/
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

	/*
	* Sends current plan to optimizer
	* @params data - a JSON object matching the required PDDL input
	*/
	ros.optimizePlan = function(data) {
		return new Promise(function(resolve, reject){
			var retData;
			$http.post(URL + '/OptimizePlan',data)
    	.success(function (data, status, headers, config) {
        retData = JSON.stringify(data);
        resolve(retData);
    	})
    	.error(function (data, status, header, config) {
        console.log("Error, please check how you're making the get request.");
    	});
		});
	}

	return ros;
};

export default angular.module("rosService", [])
	.factory('rosWebService', rosWebService);