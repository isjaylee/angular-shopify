(function() {
  'use strict';

  angular.module('bestbuybeads', [
    'toastr',

    // Angular UI modules
    'ngAnimate',
    'ui.bootstrap',
  ])
  .config(function ($sceProvider, $locationProvider) {
    $sceProvider.enabled(false);
  });
})();
