;(function() {
  'use strict';

  angular.module('nixel')

  .directive('nixelSprite',
    function() {

    return {
      restrict: 'A',
      scope: {
        spriteIndex: '=',
        scale: '=',
        editable: '@?',
      },

      controller: ['$scope', '$element', 'chrFactory', '$rootScope',
        function($scope, $element, chrFactory, $rootScope) {

          $scope.$on('chr:chrTable', function(e, chrTable) {
            $scope.editable = ($scope.editable === 'true') ? true : false;

            var n   = $scope.scale;
            var ctx = $element[0].getContext('2d');
            var idx = $scope.spriteIndex;
            for (var i = 0; i < 8; i++) {
              for (var j = 0; j < 8; j++) {
                var x = j,
                    y = i,
                    s = Number(chrTable[idx][i][j]);
                switch(s) {
                  case 0:
                    ctx.fillStyle = "rgb(255, 255, 255)";
                    break;
                  case 1:
                    ctx.fillStyle = "rgb(170, 170, 170)";
                    break;
                  case 2:
                    ctx.fillStyle = "rgb(85, 85, 85)";
                    break;
                  case 3:
                    ctx.fillStyle = "rgb(0, 0, 0)";
                    break;
                }

              ctx.fillRect(x * n, y * n, n, n);

              } // j
            } // i

          });

        }],

      link: function(scope, el, attr) {
        var e    = el[0];
        var ctx  = e.getContext('2d');
        var size = attr.scale * 8;

        scope.$watch('spriteIndex', function(e) {
          console.log('dir: ', e);  
        });

        el.attr('width',  size);
        el.attr('height', size);
      }
    };

  });

}());
