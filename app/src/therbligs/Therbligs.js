'use strict';

import TherbligsDataService from 'src/therbligs/services/TherbligsDataService';
import TherbligsList from 'src/therbligs/components/list/TherbligsList';
import TherbligsController from 'src/therbligs/TherbligsController';

export default angular
  .module("therbligs", ['ngMaterial'])
  .controller("TherbligsController", TherbligsController)
  .component(TherbligsList.name, TherbligsList.config)
  .service("TherbligsDataService", TherbligsDataService);
