"use strict"

var parser = {};

////////////THERBLIGLIST CONVERT TO PDDL JSON/////////
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
			taskName = listOfTherbligNames[i][j] + i;

			if(j == 0) preconditions = "none";
			else preconditions = listOfTherbligNames[i][j-1] + i;

			if(listOfTherbligNames[i].length == 1) constraints = "none";
			else if(j == 0) constraints = "start: path" + i;
			else if(j == listOfTherbligNames[i].length -1) constraints = "end: path" + i;
			else constraints = "path" + i;

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

// therblig names can contain spaces in them. The PDDL optimizer 
// we are using requires that the names do not contain any spaces.
// @params
// 	therbligName - name of the therblig
function convertTherbligNameToPDDLformat(therbligName) {
	var formatName, delim;
	delim = '_';
	formatName = therbligName.replace(' ', '_');

	return formatName;
}

/////////OUTPUT BACK INTO THERBLIGLIST/////
function sortTherbligs(plan) {
	var obj = [];
	for (var key in plan){
		if (plan.hasOwnProperty(key)) {
				plan[key].therblig = key;
				obj.push(plan[key]);
		}
	};

	obj.sort(function(a,b) {
		return Number(a.starttime) - Number(b.starttime)
	});

	// obj should be sorted now
	// each entry in object should be in the format of:
	// agent: r or h
	// cost: cost
	// duration: duration
	// starttime: time
	// therblig: name
	return obj;
};

function getTherbligNameFromPlanName(name) {
	var therbligName;
	therbligName = name.replace('_', ' ').substring(0, name.length - 1);
	return therbligName;
};

function getTherbligObjFromName(name, taskList, taskNo) {
	var therbligObj, therbligList, task, therblig;
	
	task = taskList[taskNo];
	therbligList = task.therbligList;

	for (var i in therbligList) {
		therblig = therbligList[i];
		if(therblig.name === name) {
			therbligObj = therblig;
			break;
		}
	}
	
	return therbligObj;
};

function convertFromPlanToTask(planList, actualList) {
	console.log('planList: ');
	console.log(planList);
	//console.log('actualList: ');
	//console.log(actualList);

	//handle 1 task case
	var thPlan, therbligName, index, therbligObj, agent;
	var newTherbligList = [];

	//loop through each therblig in the optimized plan list
	for (var th in planList) {
		thPlan = planList[th].therblig;
		agent = planList[th].agent;

		index = thPlan.substr(thPlan.length - 1);
		therbligName = getTherbligNameFromPlanName(thPlan);
		therbligObj = getTherbligObjFromName(therbligName, actualList, index);
		
		if(therbligObj !== undefined) {
			if(agent === 'r') {
				therbligObj.assign = false;
			} 
			else if(agent === 'h') {
				therbligObj.assign = true;
			}

			newTherbligList.push(therbligObj);
		}
	}

	return newTherbligList;
}


////////PARSER///////////////////////////
function optimizerParser() {
	parser.tasksToPDDLJson = function(taskList) {
		var outputObj, taskListObj;

		outputObj = new PDDLObj();
		var therbligNames = [];
		for (var j = 0; j < taskList.length; j++)
		{
			therbligNames[j] = [];

			//We will need to handle repeat here, add another loop

			for(var i = 0; i < taskList[j].therbligList.length; i++)
			{
				var PDDLformatName = convertTherbligNameToPDDLformat(taskList[j].therbligList[i].name)
				therbligNames[j].push(PDDLformatName);
			}
		};

		taskListObj = getTaskListObj(therbligNames);
		outputObj.tasks = taskListObj;
		return angular.toJson(outputObj);
	};

	parser.optimizedPlanToTasks = function(optPlan, tasksToOpt) {
		// Determine how many 'properties' are in the plan
		//console.log('optplan: ');
		//console.log(optPlan);
		//console.log('tasksToOpt');
		//console.log(tasksToOpt);

		var obj = JSON.parse(optPlan);
		var plan = obj.plan;

		var therbligList = sortTherbligs(plan);
		//console.log(therbligList);
		var optimizedList = convertFromPlanToTask(therbligList, tasksToOpt);

		return optimizedList;
	};


	return parser;
};

export default angular.module("optimizerParserService", [])
	.factory('optimizerParser', optimizerParser);