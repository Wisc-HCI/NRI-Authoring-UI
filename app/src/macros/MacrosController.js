'use strict';

function MacrosController($mdDialog, $scope) {
  var self = this;
  var macroToEdit;
  var macroListToEdit = [];
  
  self.editMacro = (ev, macro, macroList) => {
    macroToEdit = macro;
    macroListToEdit = macroList;
    $mdDialog.show({
          controller: EditMacroController,
          templateUrl: 'src/macros/components/MacroEditModal.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
  };

  function EditMacroController($mdDialog, $scope) {
    $scope.macro = macroToEdit;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.delete = (macro) => {
        var index = macroListToEdit.indexOf(macro);
        macroListToEdit.splice(index, 1);
        $mdDialog.cancel();
    };
  }
}

export default [ '$mdDialog', '$scope', MacrosController ];
