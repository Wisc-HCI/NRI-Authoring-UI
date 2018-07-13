"use strict"

var parser = {};

function PDDLObj() {
  this.name = 'example';
  this.timeweight = 1;
  this.costweight = 1;
};

function getTaskListObj(listOfTherbligNames) {
	var taskListObj = {};
	for(var i = 0; i < listOfTherbligNames.length; i++){
		for(var j = 0; j < listOfTherbligNames[i].length; j++) {
			var taskName, preconditions, constraints;
			taskName = listOfTherbligNames[i][j]+i;

			if(j == 0) preconditions = "none";
			else preconditions = listOfTherbligNames[i][j-1]+i;

			if(listOfTherbligNames[i].length == 1) constraints = "none";
			else if(j == 0) constraints = "start: path"+i;
			else if(j == listOfTherbligNames[i].length -1) constraints = "end: path"+i;
			else constraints = "path"+i;

			taskListObj[taskName] = new genericTaskObj(preconditions, constraints);
		}
	}

	return taskListObj;
};

function genericTaskObj(pre, constraint) {
	this.preconditions = pre;
	this.duration = { "human": 5, "robot": 5 };
	this.cost = { "human": 5, "robot": 5 };
	this.constraint = constraint;
}


function optimizerParser() {
	parser.tasksToPDDL = function(taskList) {
		var outputObj, taskListObj;

		outputObj = new PDDLObj();
		var therbligNames = [];
		for (var j = 0; j < taskList.length; j++)
		{
			therbligNames[j] = [];

			//We will need to handle repeat here, add another loop

			for(var i = 0; i < taskList[j].therbligList.length; i++)
			{
				therbligNames[j].push(taskList[j].therbligList[i].name);
			}
		};

		taskListObj = getTaskListObj(therbligNames);
		outputObj.tasks = taskListObj;
		//console.log(angular.toJson(outputObj));


		// keep 'name' property
		// remove 'type' property
		// if repeat > 0, repeat the task
		// therbligList property contains an array of therblig objects 

		/*
		


		*/
		return angular.toJson(outputObj);
	};

	return parser;
};

export default angular.module("optimizerParserService", [])
	.factory('optimizerParser', optimizerParser);