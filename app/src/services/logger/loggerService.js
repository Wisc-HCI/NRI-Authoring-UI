"use strict"

var logger = {};

function loggerLogService() {
	logger.log = function (message) {
      logger.innerHTML += '> ';
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }

   return logger;
};

export default angular.module("loggerService", [])
	.factory('loggerLogService', loggerLogService);