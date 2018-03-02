// Notice that we do not have a controller since this component does not
// have any specialized logic.
import TherbligsController from 'src/therbligs/TherbligsController';
'use strict';
export default {
  name : 'therbligsList',
  config : {
    bindings: {  therbligs: '<', selected : '<', showDetails : '&onSelected',
                allowedTypes: '<'},
    templateUrl: 'src/therbligs/components/list/TherbligsList.html',
    controller: TherbligsController,
  }
};
