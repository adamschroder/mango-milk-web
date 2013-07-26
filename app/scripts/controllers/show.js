// 'use strict';

// angular.module('mangoMilkWebApp').controller('ShowCtrl',
//   function ($scope, $routeParams) {

//     $scope.params = $routeParams;

//     $scope.episodes = [];

//     $scope.url = 'http://localhost:3000/episodes/' + $scope.params;
//     $scope.response = null;

//     $http({method: $scope.method, url: $scope.url}).

//       success(function(data, status) {

//         angular.forEach(data, function (result) {

//           $scope.episodes.push(result.title);
//         });

//         $scope.status = status;
//       }).
//       error(function(data, status) {

//         $scope.results = data || "Request failed";
//         $scope.status = status;
//     });
//   }
// );
