"use strict";

// Load libraries
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import dndLists from 'src/dndLists';
import AngularFileSaver from 'angular-file-saver';
import ngFileUpload from 'ng-file-upload';
import AppController from 'src/AppController';
import Therbligs from 'src/therbligs/Therbligs';
import Tasks from 'src/tasks/Tasks';
import Things from 'src/things/Things';
import Positions from 'src/positions/Positions';
import Macros from 'src/macros/Macros';
import rosService from 'src/ros/rosService'

/*
// overwrite the console logger
(function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('logger');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();
*/

export default angular.module( 'nri-authoring-env', [
    'ngMaterial',
    'dndLists',
    'ui.filters',
    'ngFileSaver',
    'ngFileUpload',
    Therbligs.name,
    Tasks.name,
    Things.name,
    Positions.name,
    Macros.name,
    'rosService'] )
  .config(($mdIconProvider, $mdThemingProvider) => {

    $mdIconProvider
      .icon("menu", "./assets/svg/menu.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('pink');
  })
  .filter('validThing', function(){
    return function(items,index,therbligList){
      var filtered;
      if((index == 0) || !(therbligList[index-1].hasThing)){
        filtered = items;
      }
      else{
        filtered = [];
        //console.log(therbligList[index-1].thing);
        filtered.push(therbligList[index-1].thing);
      }

      return filtered;
    };
  })
  .controller('AppController', AppController)
