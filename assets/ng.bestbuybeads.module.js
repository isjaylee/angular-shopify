(function() {
  'use strict';

  angular.module('bestbuybeads', [
    'toastr'
  ])
  .config(function ($sceProvider, $locationProvider) {
    $sceProvider.enabled(false);
  });
})();
