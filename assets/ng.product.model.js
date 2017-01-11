(function() {
  'use strict';

  angular.module('bestbuybeads').factory('Product', [
    '$http', '$log',

    function($http, $log) {
      $log.info('{Model} Defining the Product model.');

      return {
        get: get,
        getOne: getOne
      };

      /*----------------------------------------------------------------------------------------------
       * MANAGEMENT METHODS
       *--------------------------------------------------------------------------------------------*/
      function get(collection, limit) {
        return $http({
          method: 'GET',
          url: _url(collection, limit)
        }).then(_success);
      }

      function getOne(product) {
        return $http({
          method: 'GET',
          url: _url(product)
        }).then(_success);
      }


      /*----------------------------------------------------------------------------------------------
      /*----------------------------------------------------------------------------------------------
       * HELPER METHODS
       *--------------------------------------------------------------------------------------------*/

      // This is a general success that strips response data off of the promise.
      function _success(response) {
        return response.data.product;
      }

      function _url(product) {
        var base = '/products';
        var url = '';

        if(_.isEmpty(product)){
          url = base;
        } else {
          url = `${base}/${product}.json`;
        }

        return url;
      }

  }]);
})();
