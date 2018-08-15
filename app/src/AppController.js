/**
 * Main App Controller for the Authoring Environment
 * @param TherbligsDataService
 * @param TaskCardsDataService
 * @param $mdSidenav
 * @constructor
 */
"use strict";

var logElement;

function AppController(TherbligsDataService, TaskCardsDataService,
  ThingsDataService, $mdSidenav, $mdDialog, $scope, $http, FileSaver, Blob, Upload,
  $timeout, PositionsDataService, MacrosDataService,rosWebService, loggerLogService, optimizerParser) {
  var self = this;
  var url;

  // Things Variables
  self.things = [];
  self.console = 0;
  logElement = document.getElementById('logger');

  // Load all library things
  ThingsDataService
    .loadAllThings()
    .then(function(allThings) {
      self.things = [].concat(allThings.things);
    });

  // Therblig Variables
  self.selected = null;
  self.physicalTherbligs = []; // List of physical therbligs
  self.cognitiveTherbligs = []; // List of cognitive therbligs
  self.cogPhysTherbligs = []; // List of cognitive-physical therbligs

  // Load all library therbligs
  TherbligsDataService
    .loadAllTherbligs()
    .then(function(therbligs) {
      self.physicalTherbligs = [].concat(therbligs.physicalTherbligs);
      self.cognitiveTherbligs = [].concat(therbligs.cognitiveTherbligs);
      self.cogPhysTherbligs = [].concat(therbligs.cogPhysTherbligs);
    });

  // Tasks array
  self.tasks = [];

  // Load all library Tasks
  TaskCardsDataService
        .loadAllTasks()
        .then(function(tasks) {
          self.tasks = [].concat(tasks);
        });

  // Positions array
  self.positions = [];

  PositionsDataService
    .loadAllPositions()
    .then(function(positions) {
      self.positions = [].concat(positions);
    });

  // Macros array
  self.macros = [];

  MacrosDataService
    .loadAllMacros()
    .then(function(macros) {
      self.macros = [].concat(macros);
    });

  // *********************************
  // Internal methods
  // *********************************
  // Therblig Task Modal Variables
  var therbligTasks = [];
  var taskToEdit = {};
  var currentTask = {};

  /*
   * Method to add new tasks.
   * @param1 event service
   * @param2 tasks object
   */
  self.addTask = (ev, tasks) => {
    therbligTasks = tasks;
    $mdDialog.show({
          controller: AddTaskController,
          templateUrl: 'src/tasks/components/AddTaskModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  /*
   * Controller for the modal to add tasks
   */
  function AddTaskController($scope, $mdDialog,$mdMenu,loggerLogService) {
    // Once done, close modal and add the task to the task list

    $scope.done = function() {
      $mdDialog.cancel();
      therbligTasks.push(currentTask);
      loggerLogService.log("Added " + currentTask.name, logElement);
    };

    // Create new task
    currentTask =
    {
      name: '', type: 'task', repeat: 0,therbligList: [],
    };

    $scope.task = currentTask;
    $scope.cancel = () => {
      $mdDialog.cancel();
    };
  }

  // *********************************
  // Main Menu Options
  // *********************************
  var originatorEv;
  self.openMenu = ($mdMenu, ev) => {
    originatorEv = ev;
    $mdMenu.open(ev);
  }

  /*
  * Optimizes the current Tasks
  * @param array of tasks currently on the plan
  */
  self.optimize = (tasksToOptimize) => {
    var data,config;
    data = optimizerParser.tasksToPDDLJson(tasksToOptimize);
    loggerLogService.log(data, null);
    
    /*
    This function works. It is currently commented out pending back end
    design decidions.

    rosWebService.optimizePlan(data)
    .then( function(result) {
      var optimizedTask = optimizerParser.optimizedPlanToTasks(result, tasksToOptimize);      
      self.tasks[0].therbligList = optimizedTask;
    });
    */
  };

  /*
   * Save task.
   * @param task to save
   */
  self.save = (tasksToSave) => {
    var textToSave = JSON.stringify(tasksToSave);
    var data = new Blob([textToSave], { type: 'text/json;charset=utf-8' });
    FileSaver.saveAs(data, 'tasks.json');
  };

  /*
   * Upload tasks.
   */
  $scope.onTaskFileSelect = function(file) {
    if(typeof file !== 'undefined') 
    {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.tasks = JSON.parse(data);
        
        $scope.$apply();
      };
      r.readAsText(file);
    }
  };

  /*
   * Save Things
   * @param thing to save
   */
  self.saveThings = (thingsToSave) => {
    var textToSave = JSON.stringify(thingsToSave);
    var data = new Blob([textToSave], { type: 'text/json;charset=utf-8' });
    FileSaver.saveAs(data, 'things.json');
  };

  /*
   * Upload things.
   *
   */
  $scope.onThingsFileSelect = function(file) {
    if(typeof file !== 'undefined'){
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.things = JSON.parse(data);

        $scope.$apply();
      };
      r.readAsText(file);
    }
  };

  /*
   * Save Positions
   * @param position to save
   */
  self.savePositions = (positions) => {
    var positionsToSave = JSON.stringify(positions);
    var data = new Blob([positionsToSave], { type: 'text/json;charset=utf-8' });
    FileSaver.saveAs(data, 'positions.json');
  };

  /*
   * Upload positions file
   *
   */
  $scope.onPositionsFileSelect = function(file) {
    if(typeof file !== 'undefined')
    {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.positions = JSON.parse(data);

        $scope.$apply();
      };
      r.readAsText(file);
    }      
  };

  /*
   * Save Macros
   *
   * @param macro to save
   */
  self.saveMacros = (macros) => {
    var macrosToSave = JSON.stringify(macros);
    var data = new Blob([macrosToSave], { type: 'text/json;charset=utf-8' });
    FileSaver.saveAs(data, 'macros.json');
  };

  /*
   * Upload Macros
   *
   */
  $scope.onMacroFileSelect = function(file) {
    if(typeof file !== 'undefined') 
    {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.macros = JSON.parse(data);

        $scope.$apply();
      };
      r.readAsText(file);
    }      
  };

  /**
   * Select the current therblig
   * @param menuId
   */
  self.selectTherblig = (therblig) => {
    self.selected = angular.isNumber(therblig) ? $scope.therbligs[therblig] : therblig;
  };

  /**
   * Hide or Show the 'left' sideNav area
   */
  self.toggleList = () => {
    $mdSidenav('left').toggle();
  };

  self.toggleConsole = (ev) => {
    if(self.console == 1){
      self.console = 0;
    }
    else{
      self.console = 1;
    }
  };

  /*
  * Adds position. Allows user to add a new destination.
  */
  self.addDestination = (ev) => {
      $mdDialog.show({
      controller: AddDestinationController,
      templateUrl: 'src/positions/components/PositionsEditModal.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(successData) {
      self.positions.push(successData);
    }, function(cancelData) {
      // not implemented
    });
  }

  /*
  * Controller to add Destination
  */
  function AddDestinationController($scope, $mdDialog, $mdMenu) {
    
    var position = {
      name: '',
      type: "position",
      val: ''
    }

    $scope.position = position;

    $scope.done = function() {
      $mdDialog.hide(position);
    };

    $scope.cancel = () => {
      $mdDialog.cancel();
    };
  }

  /*
   * Add Thing function. Allows user to add a new object.
   */
  self.addThing = (ev) => {
    $mdDialog.show({
      controller: AddThingController,
      templateUrl: 'src/things/components/ThingAddModal.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(successData) {
      self.things.push(successData);
    }, function(cancelData) {
      // not implemented
    });
  };

  /*
  * Add Thing controller
  */
  function AddThingController($scope, $mdDialog,$mdMenu) {
    
    /*Fix this later*/
    function position(val) {
      this.name = 'Position (X, Y, Z)';
      this.val = '';
    }

    function orientation(val) {
      this.name = 'Orientation (X, Y, Z)';
      this.val = '';
    }

    function thingObj(name) {
      this.name = name;

      this.parameters = [
        new position(),
        new orientation(),
      ];
      this.type = 'thing';
    }

    var newThing = new thingObj('');
    $scope.thing = newThing;

    $scope.done = function() {
      $mdDialog.hide(newThing);
    };

    $scope.cancel = () => {
      $mdDialog.cancel();
    };
  }

  /*
  * Toggles the side bar's button
  */
  $scope.btnToggle = function($event){
    var cName = $event.target.className;
    if (cName === "md-primary md-raised md-button md-ink-ripple")
      $event.target.className = "md-primary md-button md-ink-ripple";
    else
      $event.target.className = "md-primary md-raised md-button md-ink-ripple";
  };
}

export default ['TherbligsDataService', 'TaskCardsDataService',
  'ThingsDataService','$mdSidenav', '$mdDialog', '$scope', '$http', 'FileSaver', 'Blob',
  'Upload', '$timeout', 'PositionsDataService', 'MacrosDataService', 'rosWebService', 'loggerLogService', 'optimizerParser',
  AppController];
