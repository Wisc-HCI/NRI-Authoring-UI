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
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(successData) {
      // not implemeneted
    }, function(cancelData) {
      // not implemented
    });
  };

  function EditPositionController($mdDialog, $scope, rosWebService) {
    $scope.position = positionToEdit;
    var ogPosition = Object.assign({}, positionToEdit);

    $scope.done = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function(){
      
      $mdDialog.cancel(ogPosition);
    }

    $scope.getPosition = (ev) => {
      rosWebService.getArmPosition().then(function(position) {
        var str = position.data;
        var data = str.split(" ");
        $scope.position.val = data[0] + ", " + data[1] + ", " + data[2];
        console.log("Orientation (not added): " + data[3] + ", " + data[4] + ", " + data[5] + ", " + data[6]); 
        $scope.$apply();
      });
    };
  }
}

export default [ '$mdDialog', '$scope','rosWebService', PositionsController ];
