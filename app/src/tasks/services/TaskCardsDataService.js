"use strict";
import SampleTasks from 'src/tasks/services/SampleTasks';

/**
 * TaskCards DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function TaskCardsDataService($q) {
  // Task List
  var tasks = [];

  // Promise-based API
  return {
    loadAllTasks: function() {
      // Simulate async nature of real remote calls
      return $q.when(tasks);
    }
  };
}

export default ['$q', TaskCardsDataService];
