"use strict";

function TasksController($mdDialog, $scope) {
  var self = this;

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

  /*
   * Edit the therblig.
   *
   * @param1 event service variable
   * @param2 therblig that needs to be edited
   * @param3 list of therbligs the therblig to be edited is in
   */
  self.editTherblig = (ev, therblig, therbligList) => {
    therbligToEdit = therblig;
    taskTherbligList = therbligList;
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
    $scope.cancel = function() {
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
      console.log(taskToEdit);
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
   * Drop callback for Task TherbligsList
   */
  self.dropCallBack = (index, item, external, type, therbligsList) => {    
    if(type == "physical" || type == "cognitive" || type == "cognitivePhysical") {
      if(validConstraint(item,index, therbligsList)) return item;
      
      return false;
    } else {
      item.therbligsList.forEach(function(entry) {
        therbligsList.push(entry);
      });
      return true;
    }
  };

}

export default [ '$mdDialog', '$scope', TasksController ];
