/**
 * Controller for individual task instances
 */
"use strict";

// Specific task instance
function TaskInstanceController($scope) {
	var self = this;

	// "Watches" if a task has been edited
	$scope.$watch('task', function (newVal, oldVal) {

		// We should add a better comparision function later
		if(newVal.therbligList.length !== oldVal.therbligList.length){
			newVal.valid = undefined;
		}
	}, true);
}

export default [ '$scope', TaskInstanceController];