'use strict';

mangoMilk.controller('MainCtrl',
  function ($scope, $http) {

    $scope.method = 'GET';
    $scope.term = '';

    $scope.search = function () {

      $scope.shows = [];

      if ($scope.term) {

        $scope.url = 'http://localhost:3000/shows?search=' + $scope.term;
        $scope.response = null;

        $http({method: $scope.method, url: $scope.url}).

          success(function(data, status) {

            angular.forEach(data, function (result) {
              $scope.shows.push(result);
            });

            $scope.status = status;
          }).
          error(function(data, status) {

            $scope.results = data || "Request failed";
            $scope.status = status;
        });
      }
    };

    $scope.updateModel = function(method, url) {
      $scope.method = method;
      $scope.url = url;
    };
  }
);
