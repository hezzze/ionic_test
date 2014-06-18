

angular.module('starter.controllers', ['ui.bootstrap'])
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
    var index = $stateParams.studyIndex;
    $scope.study = $rootScope.studies[index];
    $scope.studyIndex = index;
  }
])

.controller('ScenarioCtrl', ['$scope','$rootScope', '$stateParams',
  //'$ionicModal',
  '$modal',
  function($scope, $rootScope, $stateParams, 
    //$ionicModal,
    $modal
    ) {
    var studyIndex = $stateParams.studyIndex;
    var scenarioIndex = $stateParams.scenarioIndex;

    $scope.study = $rootScope.studies[studyIndex];
    $scope.scenario = $rootScope.studies[studyIndex].scenarios[scenarioIndex];
    $scope.studyIndex = studyIndex;

    attachGrid($scope);

    // Use Ionic modal
    // $ionicModal.fromTemplateUrl('templates/schedule_modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });

    // $scope.openModal = function() {
    //   $scope.modal.show();
    // }


    $scope.openModal = function(activityIndex, visitIndex, size) {

      var modalInstance = $modal.open({
        templateUrl: 'templates/schedule_modal.html',
        controller: scheduleModalCtrl,
        size: size,
        resolve: {
          visit: function() {
            return $scope.data.visits[visitIndex];
          },
          activity: function () {
            return $scope.data.activities[activityIndex];
          }
        }
      })

    }

    $scope.$on('scheduleGridRendered', function() {

      myScroll = new IScroll('#content', {
        bounce: false,
        scrollX: true,
        probeType: 3
      });

      myScroll.on('scroll', function() {

        // $('#header>table').css('left', myScroll.x );
        // $('#leftHeader>table').css('top', myScroll.y );

        $('#headerList').css('left', myScroll.x );
        $('#leftHeaderList').css('top', myScroll.y );
        
        // angular.element(document.querySelector('#header>table')).css({"left": myScroll.x });
        // angular.element(document.querySelector('#leftHeader>table')).css({"top": myScroll.y});
      })
    })

    // $(document).ready(function() {

    //   adjustGridHeight();

    //   //TODO
      

    //   $(window).bind('resize', adjustGridHeight);

    //   // $('#content').scroll(function() {
        
    //   //   var top = $(this).scrollTop();
    //   //   var left = $(this).scrollLeft();
    //   //   $('#header>table').css('left', -left );
    //   //   $('#leftHeader>table').css('top', -top);
    //   // });
    // });
  }
]);

var scheduleModalCtrl = function ($scope, $modalInstance, activity, visit) {

  $scope.activity = activity;
  $scope.visit = visit;

  $scope.close = function () {
    $modalInstance.dismiss('close');
  }
}


// function adjustGridHeight() {
//     var height = $(window).height();
//     $('#content').css('height', parseInt(height*0.8));
//     $('#leftHeader').css('height', parseInt(height*0.75));
// }


var NUM_OF_VISITS = 50;
var NUM_OF_ACTIVITIES = 50;


function Schedule(checked, quantity) {
    this.checked = checked || false;
    this.quantity = quantity || 0;
}

function Data(visits, activities, scheduleGrid) {
    this.visits = visits || [];
    this.activities = activities || [];
    this.scheduleGrid = scheduleGrid || [];
}

function Activity(name) {
  this.name = name || '';
}

function Visit(name) {
  this.name = name || '';
}

function attachGrid($scope) {
    var data = new Data();
    for (var i = 0; i < NUM_OF_VISITS; i++) {
        data.visits.push(new Visit('Visit ' + (i + 1)));
    }
    var row;
    for (var j = 0; j < NUM_OF_ACTIVITIES; j++) {
        row = [];
        data.activities.push(new Activity('Activity ' + (j + 1)));
        for (var k = 0; k < NUM_OF_VISITS; k++) {
          if  (j == 5 && k == 5) {
            row.push(new Schedule(true));
          } else {
            row.push(new Schedule());
          }
        }
        data.scheduleGrid.push(row);
    }
    $scope.numOfVisits = NUM_OF_VISITS;
    $scope.numOfActivities = NUM_OF_ACTIVITIES;
    $scope.data = data;
}


