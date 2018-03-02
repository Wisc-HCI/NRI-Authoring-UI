'use strict';

function ThingsController($mdDialog, $scope) {
  var self = this;
  var thingToEdit;
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

  function EditThingController($mdDialog, $scope) {
    $scope.thing = thingToEdit;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
}

export default [ '$mdDialog', '$scope', ThingsController ];
