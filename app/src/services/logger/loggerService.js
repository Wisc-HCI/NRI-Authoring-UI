"use strict"

var logger = {};

function loggerLogService() {
 	logger.log = function (element, message) {
    if (element !== null){
      logger.element = element;
    }

    if(element == null) {
      element = logger.element;
    }

    element.innerHTML += 'output> ';
      if (typeof message == 'object') {
          element.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
      } else {
          element.innerHTML += message + '<br />';
      }
    }

   return logger;
};

export default angular.module("loggerService", [])
	.factory('loggerLogService', loggerLogService);