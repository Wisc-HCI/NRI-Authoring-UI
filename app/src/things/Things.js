'use strict';

import ThingsController from 'src/things/ThingsController';
import ThingsDataService from 'src/things/services/ThingsDataService';
import ThingsList from 'src/things/components/ThingsList';

export default angular
  .module("things", ['ngMaterial'])
  .controller("ThingsController", ThingsController)
  .component(ThingsList.name, ThingsList.config)
  .service("ThingsDataService", ThingsDataService);
