'use strict';

function PositionsController($mdDialog, $scope, rosWebService) {
  var self = this;
  var positionToEdit;
  self.editPosition = (ev, position) => {
    positionToEdit = position;
    $mdDialog.show({
          controller: EditPositionController,
          templateUrl: 'src/positions/components/PositionsEditModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  function EditPositionController($mdDialog, $scope, rosWebService) {
    $scope.position = positionToEdit;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.getPosition = (ev) => {
      rosWebService.getArmPosition().then(function(position,) {
        $scope.position.val = position.X + ", " + position.Y + ", " + position.Z;
        //$scope.position.parameters[1].val = position.ThetaX + ", " + position.ThetaY + ", " + position.ThetaZ;
        $scope.$apply();
      });
    };
  }
}

export default [ '$mdDialog', '$scope','rosWebService', PositionsController ];
