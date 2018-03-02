'use strict';

import MacrosController from 'src/macros/MacrosController';
import MacrosDataService from 'src/macros/services/MacrosDataService';
import MacrosList from 'src/macros/components/MacrosList';

export default angular
  .module("macros", ['ngMaterial'])
  .controller("MacrosController", MacrosController)
  .component(MacrosList.name, MacrosList.config)
  .service("MacrosDataService", MacrosDataService);
