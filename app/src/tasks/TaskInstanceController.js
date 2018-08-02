"use strict";

function TaskInstanceController($scope) {
	var self = this;

	$scope.$watch('task', function (newVal, oldVal) {
		if(newVal.therbligList.length !== oldVal.therbligList.length){
			newVal.valid = undefined;
		}
	}, true);
}

export default [ '$scope', TaskInstanceController];