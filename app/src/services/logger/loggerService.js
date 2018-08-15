/**
 * loggerService
 * Factory object that creates a "loggerService" object. 
 * This object allows the user to specify an element 
 * on the front end for which output can be appended to.
 */
"use strict"

var logger = {};

function loggerLogService() {

  // Needs an element and a message
  // Message - Message to be displayed
  // Element - the HTML element that the message will be inserted into
 	logger.log = function (message, element) {
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