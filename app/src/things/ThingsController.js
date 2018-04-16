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
          clickOutsideToClose:true,
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
      rosWebService.getArmPosition().then(function(position,) {
        $scope.thing.parameters[0].val = position.X + ", " + position.Y + ", " + position.Z;
        $scope.thing.parameters[1].val = position.ThetaX + ", " + position.ThetaY + ", " + position.ThetaZ;
        $scope.$apply();
      });
    };
  }
}

export default [ '$mdDialog', '$scope', 'rosWebService', ThingsController ];
