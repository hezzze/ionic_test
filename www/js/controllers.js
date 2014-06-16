

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
    var index = $stateParams.studyIndex;
    $scope.study = $rootScope.studies[index];
    $scope.studyIndex = index;
  }
])

.controller('ScenarioCtrl', ['$scope','$rootScope', '$stateParams','$ionicModal',
  function($scope, $rootScope, $stateParams, $ionicModal) {
    var studyIndex = $stateParams.studyIndex;
    var scenarioIndex = $stateParams.scenarioIndex;

    $scope.study = $rootScope.studies[studyIndex];
    $scope.scenario = $rootScope.studies[studyIndex].scenarios[scenarioIndex];
    $scope.studyIndex = studyIndex;

    attachGrid($scope);

    $ionicModal.fromTemplateUrl('templates/schedule_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    }

    $scope.$on('scheduleGridRendered', function() {

      console.log("!!");
      myScroll = new IScroll('#content', {
        bounce: false,
        scrollX: true,
        probeType: 3
      });

      myScroll.on('scroll', function() {

        // $('#header>table').css('left', myScroll.x );
        // $('#leftHeader>table').css('top', myScroll.y );
        
        angular.element(document.querySelector('#header>table')).css({"left": myScroll.x });
        angular.element(document.querySelector('#leftHeader>table')).css({"top": myScroll.y});
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


function adjustGridHeight() {
    var height = $(window).height();
    $('#content').css('height', parseInt(height*0.8));
    $('#leftHeader').css('height', parseInt(height*0.75));
}


var NUM_OF_VISITS = 50;
var NUM_OF_ACTIVITIES = 50;

function Cell(txt, quantity) {
    this.txt = txt;
    this.on = false;
    this.quantity = quantity;
    this.checked = function() {
        return !this.txt && this.on;
    };
}

function Grid(header, leftHeader, body) {
    this.header = header || [];
    this.leftHeader = leftHeader || [];
    this.body = body || [];
}

function attachGrid($scope) {
    var grid = new Grid();
    for (var i = 0; i < NUM_OF_VISITS; i++) {
        grid.header.push(new Cell('Visit ' + (i + 1), 0));
    }
    var row;
    for (var j = 0; j < NUM_OF_ACTIVITIES; j++) {
        row = [];
        grid.leftHeader.push(new Cell('Activity ' + (j + 1), 0));
        for (var k = 0; k < NUM_OF_VISITS; k++) {
          if  (j == 5 && k == 5) {
            var cell = new Cell('',0);
            cell.on = true;
            row.push(cell);
          } else {
            row.push(new Cell('', 0));
          }

            
        }
        grid.body.push(row);
    }
    $scope.numOfVisits = NUM_OF_VISITS;
    $scope.numOfActivities = NUM_OF_ACTIVITIES;
    $scope.grid = grid;
}


