(function(){
  'use strict';

  angular.module('bestbuybeads').controller('IndexController',[
    '$http', '$window', 'Collection',

    function($http, $window, Collection) {
      var vm = this;
      vm.slider1 = $window.BestBuyBeads.slider1;
      vm.slider2 = $window.BestBuyBeads.slider2;
      vm.silverProducts = [];
      vm.blackProducts = [];

      getProducts();

      function getProducts() {
        Collection.getProducts('silver', null, '4').then(
          function success(response) {
            vm.silverProducts = response;
          }
        );

        Collection.getProducts('swarovski-crystal-black-gray', null, '3').then(
          function success(response) {
            vm.blackProducts = response;
          }
        );
      }
    }]);
})();
