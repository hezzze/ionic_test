// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers']).run(function($ionicPlatform, $window) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //prevent the user from scrolling the entire screen
        $window.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: "/home",
        views: {
            'content': {
                templateUrl: "templates/home.html",
                controller: 'AppCtrl'
            }
        }
    }).state('study', {
        url: "/study/:studyIndex",
        views: {
            'content': {
                templateUrl: "templates/study.html",
                controller: 'StudyCtrl'
            },
            'nav': {
                templateUrl: "templates/nav_study.html",
                controller: 'StudyCtrl'
            }
        }
    }).state('scenario', {
        url: "/study/:studyIndex/scenario/:scenarioIndex",
        views: {
            'content': {
                templateUrl: "templates/scenario.html",
                controller: 'ScenarioCtrl'
            },
            'nav': {
                templateUrl: "templates/nav_scenario.html",
                controller: 'ScenarioCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
})

.directive('gridLoaded', function($timeout, $window) {
    return {
        restrict: ' A',
        link: function(scope, element, attrs) {
            if (scope.$parent.$last && scope.$last) {

                $timeout(function() {
                    myScroll = new IScroll('#content', {
                        bounce: false,
                        scrollX: true,
                        probeType: 3,
                        scrollbars: true,
                        mouseWheel: true,

                        // quick fix for freezing issues on mobile chrome
                        // Issue: opening modal might trigger the app into a state that 
                        // iScroll handler would get a mousemove event instead of 
                        // a touchmove 
                        // related: angular bootstrap modal, iScroll 5

                        disableMouse: 'ontouchstart' in $window
                    });

                    //debugger;

                    //myScroll.on('scrollEnd', checkScroll(myScroll));

                    var scrollHandler = function() {

                        //debugger;

                        console.log("scrolling!!...")

                        if (myScroll.y > -10) {
                            $('#horizontalPatchTop').removeClass('horizontalPatchTopBorder');
                        }
                        if (myScroll.y < -10) {
                            $('#horizontalPatchTop').addClass('horizontalPatchTopBorder');
                            if (myScroll.y !== myScroll.maxScrollY) {
                                $('#horizontalPatchBottom').addClass('horizontalPatchBottomBorder');
                            }
                        }
                        if (myScroll.y < myScroll.maxScrollY + 10) {
                            $('#horizontalPatchBottom').removeClass('horizontalPatchBottomBorder');
                        }
                        if (myScroll.x > -10) {
                            $('#verticalPatchLeft').removeClass('verticalPatchLeftBorder');
                        }
                        if (myScroll.x < -10) {
                            $('#verticalPatchLeft').addClass('verticalPatchLeftBorder');
                            if (myScroll.x !== myScroll.maxScrollX) {
                                $('#verticalPatchRight').addClass('verticalPatchRightBorder');
                            }
                        }
                        if (myScroll.x < myScroll.maxScrollX + 10) {
                            $('#verticalPatchRight').removeClass('verticalPatchRightBorder');
                        }

                        $('#headerList').css('left', myScroll.x);
                        $('#leftHeaderList').css('top', myScroll.y);
                    }

                    myScroll.on('scroll', scrollHandler);

                    myScroll.on('scrollEnd', scrollHandler);
                })
            }
        }
    }
});