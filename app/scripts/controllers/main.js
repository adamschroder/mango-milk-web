'use strict';

mangoMilk.controller('MainCtrl',
  function ($scope, $http, $timeout) {

    $scope.method = 'GET';
    $scope.term = '';
    $scope.shows = [];
    // add/remove spinner||loader whatever
    function getShows() {

      $scope.url = 'http://localhost:3000/shows';
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

    $scope.currentPage = 0;
    $scope.pageSize = 20;

    $scope.numberOfPages = function () {

        return Math.ceil($scope.shows.length/$scope.pageSize);
    };

    // Instantiate these variables outside the watch
    var tempFilterText = '';
    var filterTextTimeout;

    $scope.$watch('term', function (val) {

        $scope.numberOfPages();

        if (filterTextTimeout) {

          $timeout.cancel(filterTextTimeout);
        }

        tempFilterText = val;

        filterTextTimeout = $timeout(function() {

          $scope.term = tempFilterText;
        });
    });

    getShows();
  }
);

mangoMilk.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  };
});
