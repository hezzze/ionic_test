

angular.module('starter.controllers', [])
.run(['$rootScope','$http',
  function($rootScope,$http) {
    $http.get('data/studies.json').success(function (data) {
      $rootScope.studies = data;
    });

  }])

.controller('AppCtrl', ['$scope', '$rootScope',
	function($scope, $rootScope) {
	}
])

.controller('StudyCtrl', ['$scope', '$rootScope', '$stateParams',
  function($scope, $rootScope, $stateParams) {
    $scope.study = $rootScope.studies[$stateParams.i];
  }
])

.controller('ScenarioCtrl', function($scope, $stateParams) { })
