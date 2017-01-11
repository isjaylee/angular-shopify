(function(){
  'use strict';

  angular.module('bestbuybeads').controller('ProductController',[
    '$http', '$window', 'toastr',

    function($http, $window, toastr) {
      var vm = this;
      vm.product = angular.fromJson($window.BestBuyBeads.product);
      vm.increment = increment;
      vm.decrement = decrement;
      vm.addCartQuantity = 1;
      vm.addToCart = addToCart;
      vm.sidebarLinks = [];

      getSidebar();

      function increment() {
        vm.addCartQuantity ++;
      }

      function decrement() {
        vm.addCartQuantity --;
      }

      function addToCart() {
        return $http({
          method: 'POST',
          data: {quantity: vm.addCartQuantity, id: vm.product.variants[0].id},
          url: '/cart/add.js'
        }).then(
          function success(response) {
            var cartCount = document.getElementById('cart-count').innerHTML;
            var count = parseInt(cartCount);
            var finalCount = count + vm.addCartQuantity;
            document.getElementById('cart-count').innerHTML = '' + finalCount;
            toastr.success(`${vm.product.title} was added to your cart.`, 'Success!');
          }
        );
      }

      function getSidebar() {
        return $http({
          method: 'GET',
          url: '/pages/sidebar?view=linklists'
        }).then(
          function success(response) {
            vm.sidebarLinks = response.data.links;
          }
        );
      }
    }]);
})();
