'use strict';

import angular from 'angular';

import App from 'src/app';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */

    angular
      .module( 'authoring-environment', [ App.name ] )
      .run(()=>{
        console.log(`Running the NSF NRI Authoring Environment`);
      });

    let body = document.getElementsByTagName("body")[0];
    angular.bootstrap( body, [ 'authoring-environment' ]);
