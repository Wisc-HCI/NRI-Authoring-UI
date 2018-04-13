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
    var self = this;

    $scope.thing = thingToEdit;

    //
    console.log(thingToEdit.name)

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.getPosition = (ev) => {
      var action = {"Action":"GetPosition"};
      //https://stackoverflow.com/questions/27261626/
      //angularjs-why-is-emit-not-working-from-my-popup-window?utm_medium=
      //organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      $scope.$root.$broadcast("getPosition",action);
    };

    $scope.$on("returnPosition", function(event, args){
      //console.log(args);
      //console.log($scope.thing);
      $scope.thing.parameters[0].val = args;
    });
  }
}

export default [ '$mdDialog', '$scope', ThingsController ];
