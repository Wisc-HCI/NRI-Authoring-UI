'use strict';

import PositionsController from 'src/positions/PositionsController';
import PositionsList from 'src/positions/components/PositionsList';
import PositionsDataService from 'src/positions/services/PositionsDataService';

export default angular
  .module("positions", ['ngMaterial'])
  .controller("PositionsController", PositionsController)
  .component(PositionsList.name, PositionsList.config)
  .service("PositionsDataService", PositionsDataService);
