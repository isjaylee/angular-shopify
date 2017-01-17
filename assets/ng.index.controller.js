(function(){
  'use strict';

  angular.module('bestbuybeads').controller('IndexController',[
    '$http', '$window', 'Collection',

    function($http, $window, Collection) {
      var vm = this;
      vm.slider1 = $window.BestBuyBeads.slider1;
      // vm.slider2 = $window.BestBuyBeads.slider2;
      // vm.slider3 = $window.BestBuyBeads.slider3;
      vm.silverProducts = [];
      vm.blackProducts = [];
      vm.gridMenuLinks = [];
      vm.activeLink = 'Swarovski';
      vm.submenuLinks = [];
      vm.getSubmenuLinks = getSubmenuLinks;

      getProducts();
      getGridMenu();

      vm.slide = [vm.slider1];

      function getProducts() {
        Collection.getProducts('silver', null, '6').then(
          function success(response) {
            vm.silverProducts = response;
          }
        );

        Collection.getProducts('swarovski-crystal-black-gray', null, '6').then(
          function success(response) {
            vm.blackProducts = response;
          }
        );
      }

      function getGridMenu() {
        return $http({
          method: 'GET',
          url: '/pages/grid-menu?view=linklists'
        }).then(
          function success(response) {
            vm.gridMenuLinks = response.data.links;
            vm.submenuLinks = _.find(vm.gridMenuLinks, {parent: 'Swarovski'}).children;
          }
        );
      }

      function getSubmenuLinks(link) {
        vm.activeLink = link.parent;
        vm.submenuLinks = _.find(vm.gridMenuLinks, {parent: vm.activeLink}).children;
      }
    }]);
})();
