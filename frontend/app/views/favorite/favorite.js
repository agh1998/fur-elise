'use strict';

angular.module('myApp.favorite', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/favorite', {
    templateUrl: 'views/favorite/favorite.html',
    controller: 'FavoriteCtrl'
  });
}])

.controller('FavoriteCtrl', ['$scope', 'httpUtil', 'fakeData', '$location', function($scope, httpUtil, fakeData, $location) {
    $scope.favoriteList = [];
    $scope.selected = null;

    key.unbind('up');
    key.unbind('down');

    httpUtil.get("/")
    .then(function(response) {


    }, function(error) {
        //TODO: PUT ALL THESE CODE INTO "THEN"
        var response = fakeData.favoriteList; // TODO: Change to real API data

        if (response !== null) {
            $scope.favoriteList = response;
            if($scope.favoriteList.length > 0) $scope.selected = 0;
        }
    })

    $scope.select = function(ind) {
        $scope.selected = ind;
        console.log(ind);
    }


    $scope.up = function(ind) {
        if($scope.selected != null) {
            if($scope.selected > 0) {
                $scope.selected --;
                $scope.$apply();
            }
        }
    }

    $scope.down = function(ind) {
        if($scope.selected != null) {
            if($scope.selected < $scope.favoriteList.length - 1) {
                $scope.selected ++;
                $scope.$apply();
            }
        }
    }

    console.log($location.path());
    if($location.path() == '/favorite') {

        key('up', function() {
          console.log('up key pressed');
          $scope.up();
        });

        key('down', function() {
          console.log('down key pressed');
          $scope.down();
        });
    }

}]);