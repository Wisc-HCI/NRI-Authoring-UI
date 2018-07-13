"use strict";

function TasksController($mdDialog, $scope, $mdMenu, rosWebService) {
  var self = this;

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
  }

  var originatorEv;
  self.openTaskMenu = (ev,$mdMenu) => {
    originatorEv = ev;
    $mdMenu.open(ev);
  }

  /*
  *
  */
  self.executePlan = (ev,task) => {
    var action = {"Action":"ExecutePlan"};
    action["content"] = [];
    action["content"].push(task);
    rosWebService.executePlan(action);
  }

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

  function EditModalController($scope, $mdDialog) {
    $scope.therblig = therbligToEdit;
    $scope.done = function() {
      $mdDialog.cancel();
    };

    $scope.delete = (therblig) => {
        var index = taskTherbligList.indexOf(therblig);
        taskTherbligList.splice(index, 1);
        $scope.cancel();
    };
  }

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

  function AssignTaskController($scope, $mdDialog) {
    $scope.task = taskToEdit;
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /*
   * @param1 event service variable
   * @param2 task that needs to be edited
   * @param3 list of tasks that the task that needs to be edited is in
   */
  self.assignTaskTwo = (ev, task, tasks, macros) => {
    taskToEdit = task;
    taskList = tasks;
    macrosToEdit = macros;
    $mdDialog.show({
          controller: AssignTaskControllerTwo,
          templateUrl: 'src/tasks/components/AssignTaskModal2.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  function AssignTaskControllerTwo($scope, $mdDialog) {
    $scope.task = taskToEdit;
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function isValid(therblig, index, therbligsList) {
    var pTherblig, nTherblig, valid;

    valid = true;
    if(therbligsList.length == 0) return valid;
    else {

      // inserting into the middle or end
      if(index != 0 ) {

        // check previous therblig
        pTherblig = therbligsList[index-1];
        valid = pTherblig.allowed.indexOf(therblig.name) > -1;

        // check next therblig
        if(index < therbligsList.length - 1){
          nTherblig = therbligsList[index];
          valid = therblig.allowed.indexOf(nTherblig.name) > -1;
        } 

      } 
      // inserting into the top of the list
      else {
        nTherblig = therbligsList[index];
        valid = therblig.allowed.indexOf(nTherblig.name) > -1;
      }
    }
    
    return valid;
  }

  /*
   * Drop callback for Task TherbligsList
   */
  self.dropCallBack = (index, item, external, type, therbligsList) => {    
    if(type == "physical" || type == "cognitive" || type == "cognitivePhysical") {
      
      if(!isValid(item,index,therbligsList)) return false
      
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
      //return false;
    } else {
      item.therbligsList.forEach(function(entry) {
        therbligsList.push(entry);
      });
      return true;
    }
  };

}

export default [ '$mdDialog', '$scope', '$mdMenu', 'rosWebService', TasksController ];
