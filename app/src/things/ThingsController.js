'use strict';

/*
 * Controller for Things object. 
 */
function ThingsController($mdDialog, $scope, rosWebService) {
  var self = this;
  var thingToEdit;

  /*
   * Handles when a Thing object is edited from the sidebar.
   */
  self.editThing = (ev, thing) => {
    thingToEdit = thing;
    $mdDialog.show({
          controller: EditThingController,
          templateUrl: 'src/things/components/ThingEditModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  /*
   * EditThing controller
   */
  function EditThingController($mdDialog, $scope) {
    var self = this;
    $scope.thing = thingToEdit;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.getPosition = (ev) => {
      rosWebService.getArmPosition().then(function(position) {
        var str = position.data;
        var data = str.split(" ");

        $scope.thing.parameters[0].val = data[0] + ", " + data[1] + ", " + data[2];
        $scope.thing.parameters[1].val = data[3] + ", " + data[4] + ", " + data[5] + "," + data[6];
        $scope.$apply();
      });
    };
  }
}

export default [ '$mdDialog', '$scope', 'rosWebService', ThingsController ];
