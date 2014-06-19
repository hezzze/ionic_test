angular.module('starter.controllers', ['ui.bootstrap'])
    .run(['$rootScope', '$http',
        function($rootScope, $http) {
            $http.get('data/studies.json').success(function(data) {
                $rootScope.studies = data;
            });

        }
    ])

.controller('AppCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {}
])

.controller('StudyCtrl', ['$scope', '$rootScope', '$stateParams',
    function($scope, $rootScope, $stateParams) {
        var index = $stateParams.studyIndex;
        $scope.study = $rootScope.studies[index];
        $scope.studyIndex = index;
    }
])

.controller('ScenarioCtrl', ['$scope', '$rootScope', '$stateParams',
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


        var openModal = function(data, tplUrl, size) {

            var modalInstance = $modal.open({
                templateUrl: tplUrl,
                controller: modalCtrl,
                size: size,
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            })
        }

        $scope.openScheduleModal = function(schedule) {
            var tplUrl = "templates/schedule_modal.html";
            openModal(schedule, tplUrl);
        }

        $scope.openVisitModal = function(visit) {
            var tplUrl = "templates/visit_modal.html";
            openModal(visit, tplUrl);
        }

        $scope.openActivityModal = function(activity) {
            var tplUrl = "templates/activity_modal.html";
            openModal(activity, tplUrl);
        }

        $scope.$on('scheduleGridRendered', function() {

            myScroll = new IScroll('#content', {
                bounce: false,
                scrollX: true,
                probeType: 3,
                scrollbars: true
            });

            //myScroll.on('scrollEnd', checkScroll(myScroll));

            var scrollHandler = function() {
                if (myScroll.y > -100) {
                    $('#horizontalPatchTop').removeClass('horizontalPatchTopBorder');
                }
                if (myScroll.y < -100) {
                    $('#horizontalPatchTop').addClass('horizontalPatchTopBorder');
                    if (myScroll.y !== myScroll.maxScrollY) {
                        $('#horizontalPatchBottom').addClass('horizontalPatchBottomBorder');
                    }
                }
                if (myScroll.y < myScroll.maxScrollY + 50) {
                    $('#horizontalPatchBottom').removeClass('horizontalPatchBottomBorder');
                }

                $('#headerList').css('left', myScroll.x);
                $('#leftHeaderList').css('top', myScroll.y);
            }

            myScroll.on('scroll', scrollHandler);

            myScroll.on('scroll', scrollHandler);
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

var modalCtrl = function($scope, $modalInstance, data) {

    $scope.data = data;

    $scope.close = function() {
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


function Schedule(visit, activity, checked, quantity) {
    this.activity = activity;
    this.visit = visit;
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
            if (j == 5 && k == 5) {
                row.push(new Schedule(data.visits[k], data.activities[j], true));
            } else {
                row.push(new Schedule(data.visits[k], data.activities[j]));
            }
        }
        data.scheduleGrid.push(row);
    }
    $scope.numOfVisits = NUM_OF_VISITS;
    $scope.numOfActivities = NUM_OF_ACTIVITIES;
    $scope.data = data;
}