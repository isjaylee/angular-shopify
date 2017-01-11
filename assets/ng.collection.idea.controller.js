(function() {
  'use strict';

  angular.module('bestbuybeads').controller('CollectionIdeaController',[
    '$http', '$window', '$location', 'Collection', 'Product', 'toastr',

    function($http, $window,$location, Collection, Product, toastr) {
      var vm = this;
      vm.collectionHandle = $window.BestBuyBeads.collection;
      vm.products = [];
      vm.quantity = 1;
      vm.increment = increment;
      vm.decrement = decrement;
      vm.addToCart = addToCart;

      getProducts();
      getCollection();

      function getProducts() {
        Collection.getProducts(vm.collectionHandle).then(
          function success(response) {
            vm.products = response;
          }
        );
      }

      function getCollection() {
        Collection.get(vm.collectionHandle).then(
          function success(response) {
            vm.collection = response;
          }
        );
      }

      function increment(product) {
        product.add_cart_quantity ++;
      }

      function decrement(product) {
        product.add_cart_quantity --;
      }

      function addToCart(product) {
        var productId = product.variants[0].id;
        return $http({
          method: 'POST',
          data: {quantity: product.add_cart_quantity, id: productId},
          url: '/cart/add.js'
        }).then(
          function success(response) {
            var cartCount = document.getElementById('cart-count').innerHTML;
            var count = parseInt(cartCount);
            var finalCount = count + product.add_cart_quantity;
            document.getElementById('cart-count').innerHTML = '' + finalCount;
            toastr.success(`${product.title} was added to your cart.`, 'Success!');
          }
        );
      }

    }]);
})();
