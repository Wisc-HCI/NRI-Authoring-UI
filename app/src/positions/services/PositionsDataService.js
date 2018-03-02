"use strict";

import LibraryPositions from 'src/positions/services/PositionsDataModel';

function PositionsDataService($q) {
  var positions = LibraryPositions.positions;

  // Promise-based API
  return {
    loadAllPositions: function() {
      // Simulate async nature of real remote calls
      return $q.when(positions);
    }
  };
}

export default ['$q', PositionsDataService];
