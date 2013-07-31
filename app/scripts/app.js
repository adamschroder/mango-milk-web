'use strict';

var mangoMilk = angular.module('mangoMilkWebApp', []);

// move to helper
function compare(a, b) {

  if (parseInt(a.air_date, 10) < parseInt(b.air_date, 10)) {
    return -1;
  }

  if (parseInt(a.air_date, 10) > parseInt(b.air_date, 10)) {
    return 1;
  }

  return 0;
}

// TODO: move this to a module, dont get this yet
angular.module('mangoMilkWebApp').controller('ShowCtrl',
  function ($scope, $routeParams, $http) {

    $scope.params = $routeParams;
    $scope.episodes = [];
    $scope.watchedEpisodes = [];

    $scope.url = 'http://localhost:3000/episodes?id=' + $scope.params.id;
    $scope.response = null;
    $scope.method = 'GET';

    $http({method: $scope.method, url: $scope.url}).

      success(function(data, status) {

        // get watched shows
        $http({method: 'GET', url: 'http://localhost:3000/watched_episodes?user_id=' + 1}).
        success(function (watchedData) {

          $scope.watchedEpisodes = watchedData;

          angular.forEach(data, function (result) {

            for (var i =0; i < watchedData.length; i++) {

              if (watchedData[i].episode_id === result.id) {

                result.watched = 'true';
              }
            }

            $scope.episodes.push(result);
          });

          $scope.episodes.sort(compare);
          $scope.status = status;
        });
      }).
      error(function(data, status) {

        $scope.results = data || 'Request failed';
        $scope.status = status;
    });

    $scope.updateWatchedStatus = function(episodeId, data) {

      var method = data ?  'POST': 'DELETE';
      var url = 'http://localhost:3000/watched_episodes?episode_id=' + episodeId + '&user_id=' + 1;

      if (!data) {
        // move this shit to a config
        url = 'http://localhost:3000/watched_episodes/' + episodeId + '?user_id=' + 1;
      }

      $http({method: method, url: url}).
      success(function (data) {
        // remove spinnerz
      });
    };
  }
);


mangoMilk.config(
  function ($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })

      .when('/show/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }
    );
  }
);


