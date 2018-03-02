"use strict";

import PositionsController from 'src/positions/PositionsController';

export default {
  name : 'positionsList',
  config : {
    bindings: {  positions: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl: 'src/positions/components/PositionsList.tmpl.html',
    controller: PositionsController,
  }
};
