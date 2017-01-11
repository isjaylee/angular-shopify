(function() {
  'use strict';

  angular.module('bestbuybeads').factory('Collection', [
    '$http', '$log',

    function($http, $log) {
      $log.info('{Model} Defining the Collection model.');

      return {
        get: get,
        getProducts: getProducts,
        getTags: getTags
      };

      /*----------------------------------------------------------------------------------------------
       * MANAGEMENT METHODS
       *--------------------------------------------------------------------------------------------*/
      function get(collectionHandle, page, limit, tagFilter) {
        return $http({
          method: 'GET',
          url: `/collections/${collectionHandle}.json`
        }).then(
          function success(response){
            return response.data.collection;
          }
        );
      }

      function getProducts(collectionHandle, page, limit, tagFilter) {
        return $http({
          method: 'GET',
          url: _url(collectionHandle, page, limit, tagFilter)
        }).then(_success);
      }

      function getTags(collectionHandle) {
        return $http({
          method: 'GET',
          url: `/collections/${collectionHandle}?view=tags`
        }).then(
          function success(response) {
            return response.data.tags;
          }
        );
      }
      /*----------------------------------------------------------------------------------------------
      /*----------------------------------------------------------------------------------------------
       * HELPER METHODS
       *--------------------------------------------------------------------------------------------*/

      // This is a general success that strips response data off of the promise.
      function _success(response) {
        return response.data.products;
      }

      function _url(collectionHandle, page, limit, tagFilter) {
        var base = '/collections';
        var url = '';

        if(_.isEmpty(collectionHandle)){
          url = base;
        } else if (!_.isEmpty(limit)){
          url = `${base}/${collectionHandle}/products.json?limit=${limit}`;
        } else {
          var filter = !_.isEmpty(tagFilter) ? tagFilter : '';
          url = `${base}/${collectionHandle}/${filter}?view=products&page=${page}`;
        }

        return url;
      }

  }]);
})();
