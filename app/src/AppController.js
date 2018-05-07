/**
 * Main App Controller for the Angular Material Starter App
 * @param TherbligsDataService
 * @param TaskCardsDataService
 * @param $mdSidenav
 * @constructor
 */
"use strict";

function AppController(TherbligsDataService, TaskCardsDataService,
  ThingsDataService, $mdSidenav, $mdDialog, $scope, $http, FileSaver, Blob, Upload,
  $timeout, PositionsDataService, MacrosDataService,rosWebService) {
  var self = this;
  var url;

  // Things Variables
  self.things = [];

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
  function AddTaskController($scope, $mdDialog,$mdMenu) {
    // Once done, close modal and add the task to the task list
    $scope.done = function() {
      $mdDialog.cancel();
      therbligTasks.unshift(currentTask);
    };

    // Create new task
    currentTask =
    {
      name: '',
      type: 'task',
      repeat: 0,
      therbligList: [
      ],
    };
    $scope.task = currentTask;

    $scope.cancel = () => {
      $mdDialog.cancel();
    };
  }

 /*
  * Check ROS
  */
  self.checkROS = () => {      
    var data,config;
    data = {"Action":"CheckROSLive"};
    console.log("checking ros");
    $http.post('/checkROS', data, config)
    .success(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    })
    .error(function (data, status, header, config) {
        console.log("Error");
    });
  };

  self.launchROS = () => {      
    var data,config;
    $http.post('/launchROS', data, config)
    .success(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    })
    .error(function (data, status, header, config) {
        console.log("Error");
    });
  };

  self.exit = () => {      
    var data,config;
    $http.post('/exit', data, config)
    .success(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    })
    .error(function (data, status, header, config) {
        console.log("Error");
    });

  };

  self.turnOnForce = () => {
    rosWebService.turnOnForceCtrl();
  };
  
  self.turnOffForce = () => {
    rosWebService.turnOffForceCtrl();
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
   *
   */
  $scope.$watch('file', function(){
    if($scope.file) {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.tasks = JSON.parse(data);
      };
      r.readAsText($scope.file);
    }
  });

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
  $scope.$watch('thingsFile', function(){
    if($scope.thingsFile) {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.things = JSON.parse(data);
      };
      r.readAsText($scope.thingsFile);
    }
  });

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
   * Upload things.
   *
   */
  $scope.$watch('positionsFile', function(){
    if($scope.positionsFile) {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.positions = JSON.parse(data);
      };
      r.readAsText($scope.positionsFile);
    }
  });

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
  $scope.$watch('macrosFile', function(){
    if($scope.macrosFile) {
      var r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        self.macros = JSON.parse(data);
      };
      r.readAsText($scope.macrosFile);
    }
  });

  var originatorEv;
  self.openMenu = ($mdMenu, ev) => {
    originatorEv = ev;
    $mdMenu.open(ev);
  }

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
  'Upload', '$timeout', 'PositionsDataService', 'MacrosDataService', 'rosWebService',
  AppController];
