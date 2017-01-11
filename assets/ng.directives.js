(function() {
  'use strict';

  angular.module('bestbuybeads').filter('formatToHtml', [
    '$filter',
    function($filter) {
      return function(input, format) {
        // Convert the input into a string.
        var text = ''+(input||'');
        return decodeURIComponent(text);
      };
    }
  ]);

  angular.module('bestbuybeads').directive('price', [
    function() {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var price = scope.$eval(attrs.price);
        price /= Math.pow(10, 2);
        var currency = numeral(price).format('$0,0.00');
        element[0].innerHTML = currency;
      }
    }
  ]);

  angular.module('bestbuybeads').directive('indexprice', [
    function() {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var price = scope.$eval(attrs.indexprice);
        var currency = numeral(price).format('$0,0.00');
        element[0].innerHTML = currency;
      }
    }
  ]);
})();
