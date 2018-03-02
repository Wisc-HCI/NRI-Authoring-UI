/**
 * Therbligs DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
"use strict";
import allTherbligs from 'src/therbligs/services/therbligsDataModel';

function TherbligsDataService($q) {
  var therbligs = {
    physicalTherbligs: allTherbligs.physicalTherbligs,
    cognitiveTherbligs: allTherbligs.cognitiveTherbligs,
    cogPhysTherbligs: allTherbligs.cogPhysTherbligs,
  };

  // Promise-based API
  return {
    loadAllTherbligs: function() {
      // Simulate async nature of real remote calls
      return $q.when(therbligs);
    }
  };
}

export default ['$q', TherbligsDataService];

