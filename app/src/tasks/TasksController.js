/**
 * Task Controller
 * Main controller for tasks.
 * @constructor
 */
"use strict";

function TasksController($mdDialog, $scope, $mdMenu, rosWebService,loggerLogService) {
  var self = this;

  // Toggle for human/robot agent
  $scope.data = {
    assign: false
  };

  // Updates Therblig object
  self.updateTherbligThing = (therblig, thing) => {
    therblig.thing = thing;
  };

  // Updates Therblig position
  self.updateTherbligPosition = (therblig, position) => {
    therblig.parameters[0] = position;
  };

  // Variables for Edit Therblig Method
  var therbligToEdit = {};
  var taskTherbligList = [];

  // Verify that the drop is valid
  function validConstraint(therblig, index, therbligsList) {
    var pTherblig, valid;

    pTherblig = (index ? therbligsList[index-1].name : "");
    if (typeof therblig.constraints == "undefined") valid = true;
    else valid = therblig.constraints.indexOf(pTherblig) > -1;

    return valid;
  };

  // Determines if the next therblig is valid
  function isNextValid(current, next) {
    return current.allowed.indexOf(next.name) > -1;
  }

  var originatorEv;
  self.openTaskMenu = (ev,$mdMenu) => {
    originatorEv = ev;
    $mdMenu.open(ev);
  };

  /*
  * Executes plan
  */
  self.executePlan = (ev,task) => {
    var action = {"Action":"ExecutePlan"};
    action["content"] = [];
    action["content"].push(task);
    rosWebService.executePlan(action);
  };


  /*
  * Checks to make sure all the therbligs on the task
  * satisfy logical constraints
  *
  * @param1 event service variable
  * @param2 list of the current task
  */
  self.checkConstraints = (ev, task) => {
    var valid = true;
    var tList = task.therbligList;
    for (var i = 0; i < tList.length - 1; i++) {
        if(!isNextValid(tList[i], tList[i + 1])){
          tList[i + 1].wrong = true;
          valid = false;
        }
        else
        {
          tList[i + 1].wrong = false;
        }
    }

    if(valid) {
      loggerLogService.log("All constraints are statisfied.");
    }
    else {
      loggerLogService.log("Some constraints are not statisfied.");
    }

    task.valid = valid;
  };

  /*
  * Deletes the task.
  *
  * @param1 current tasks
  * @param2 list of all tasks
  */
  self.deleteTask = (task,tasks) => {
      var taskList = tasks;
      var index = taskList.indexOf(task);
      taskList.splice(index, 1);
  };

  /*
   * Edit the therblig.
   *
   * @param1 event service variable
   * @param2 therblig that needs to be edited
   * @param3 list of therbligs the therblig to be edited is in
   */
  self.editTherblig = (ev, therblig, therbligsList) => {
    therbligToEdit = therblig;
    taskTherbligList = therbligsList;
    $mdDialog.show({
          controller: EditModalController,
          templateUrl: 'src/therbligs/components/edit/EditModal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  function TaskInstanceController($scope) {
    console.log("Task Instance");
  }


  // Variables for Edit Task method
  var taskToEdit = {};
  var taskList = [];
  var macrosToEdit = [];

  /*
   * @param1 event service variable
   * @param2 task that needs to be edited
   * @param3 list of tasks that the task that needs to be edited is in
   */
  self.editTask = (ev, task, tasks, macros) => {
    taskToEdit = task;
    taskList = tasks;
    macrosToEdit = macros;
    $mdDialog.show({
          controller: EditTaskController,
          templateUrl: 'src/tasks/components/EditTaskModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  // Controller for the Therblig Edit Modal
  function EditModalController($scope, $mdDialog) {
    $scope.therblig = therbligToEdit;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.done = function() {
      $mdDialog.cancel();
    };

    $scope.delete = (therblig) => {
        var index = taskTherbligList.indexOf(therblig);
        taskTherbligList.splice(index, 1);
        $scope.cancel();
    };
  }

  // Controller for the Task Edit Modal
  function EditTaskController($scope, $mdDialog) {
    $scope.task = taskToEdit;
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.delete = (task) => {
        var index = taskList.indexOf(task);
        taskList.splice(index, 1);
        $mdDialog.cancel();
    };

    $scope.saveMacro = (macroName, therbligs) => {
      var newMacro = {
        name: macroName,
        therbligsList: therbligs,
        type: "macro"
      };

      macrosToEdit.push(newMacro);
      $mdDialog.cancel();
    };
  }

  /*
   * @param1 event service variable
   * @param2 task that needs to be edited
   * @param3 list of tasks that the task that needs to be edited is in
   */
  self.assignTask = (ev, task, tasks, macros) => {
    taskToEdit = task;
    taskList = tasks;
    macrosToEdit = macros;
    $mdDialog.show({
          controller: AssignTaskController,
          templateUrl: 'src/tasks/components/AssignTaskModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  /*
   * Drop callback for Task TherbligsList
   */
  self.dropCallBack = (index, item, external, type, therbligsList) => {    
    if(type == "physical" || type == "cognitive" || type == "cognitivePhysical") {
      
      var prop = 'thing';
      if(item.hasOwnProperty(prop)){
        if((index > 0) && (therbligsList[index-1].hasOwnProperty(prop))) {
          var thing = therbligsList[index-1].thing;
          Object.assign(item.thing, thing);
        }
      }

      if(item.parameters[0].hasOwnProperty('type')){
        if((index > 0) && (therbligsList[index-1].parameters[0].hasOwnProperty('type'))) {
          var position = therbligsList[index-1].parameters[0];
          Object.assign(item.parameters[0], position);
        }        
      }

      return item;
    } else {
      item.therbligsList.forEach(function(entry) {
        therbligsList.push(entry);
      });
      return true;
    }
  };

}

export default [ '$mdDialog', '$scope', '$mdMenu', 'rosWebService', 'loggerLogService', TasksController ];
