"use strict";
import allThings from 'src/things/services/ThingsDataModel';

function ThingsDataService($q) {
  var things = allThings;

  // Promise-based API
  return {
    loadAllThings: function() {
      // Simulate async nature of real remote calls
      return $q.when(things);
    }
  };
}

export default ['$q', ThingsDataService];

