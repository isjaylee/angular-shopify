(function() {
  'use strict';

  angular.module('bestbuybeads').controller('CollectionController',[
    '$http', '$window', '$location', 'Collection', 'Product', 'toastr',

    function($http, $window,$location, Collection, Product, toastr) {
      var vm = this;
      vm.collection = $window.BestBuyBeads.collection;
      vm.products = [];
      vm.quantity = 1;
      vm.increment = increment;
      vm.decrement = decrement;
      vm.addToCart = addToCart;
      vm.sidebarLinks = [];
      vm.goTo = goTo;
      vm.page = parseInt(location.search.substring(1).split('page=')[1]);
      vm.currentPage = vm.page || 1;
      vm.pageRange = [vm.currentPage - 2, vm.currentPage - 1, vm.currentPage];
      vm.nextPage = nextPage;
      vm.previousPage = previousPage;
      vm.lastPage = 0;

      // Get the collection filtered by tags.
      // Example: /collections/all/silver+6mm will return all
      // products that are silver AND 6mm.
      var tagFilter = window.location.pathname.split('/').filter(Boolean)[2];

      getProducts();
      getSidebar();

      function getProducts() {
        Collection.getProducts(vm.collection, vm.page, null, tagFilter).then(
          function success(response) {
            vm.products = response;
            showMorePagination();
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

      function showMorePagination() {
        if (vm.products.length === 25) {
          vm.pageRange.push(vm.currentPage + 1);
          vm.lastPage = _.last(vm.pageRange);
        }
      }

      function goTo(page) {
        var tagFilter = window.location.pathname.split('/').filter(Boolean)[2];
        var filter = !_.isEmpty(tagFilter) ? tagFilter : '';
        if (page === '') {
          return $window.location.href = `/collections/${vm.collection}/${filter}`;
        } else {
          return $window.location.href = `/collections/${vm.collection}/${filter}?page=${page}`;
        }
      }

      function nextPage() {
        vm.currentPage ++;
        goTo(vm.currentPage);
      }

      function previousPage() {
        vm.currentPage --;
        goTo(vm.currentPage);
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
