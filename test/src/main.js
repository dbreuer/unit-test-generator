/***
 *
 * APP JS
 *
 * @file
 * This is the main application file and defines the scope for the project
 *
 */


'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [
    'ngRoute',
    'angular-jwt',
    'angular-storage',
    'formly',
    'formlyBootstrap',
    'project.auth',
    'project.frontpage',
    'project.news',
    'project.about',
    'project.maintenance',
    'project.dashboard',
    'project.contact',
    'project.login',
    'project.auth',
    'project.user',
    'project.api'

])

    // App config
    .config([

        '$routeProvider',
        '$locationProvider',
        '$httpProvider',
        'jwtInterceptorProvider',

        function ($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

            // @todo - use the HTML5 History API (only set in the main app.js not individual routes...)
            // @todo - needs nginx proxy to rewrite request to index.html

            //if (window.history && window.history.pushState) {
            //    $locationProvider.html5Mode(true);
            //}

            //$httpProvider.interceptors.push('AuthInterceptor');
            $routeProvider.otherwise({redirectTo: '/frontpage'});

            // Add JWT Token to each request
            jwtInterceptorProvider.tokenGetter = function () {
                return localStorage.getItem('aat-auth-token');
            }
            $httpProvider.interceptors.push('jwtInterceptor');

        }])

    // Define App constants (ref env vars)
    // @todo - review how to make this dynamic when ENV_VARS don't exist i.e. AWS s3 bucket
    //.constant('DEV_API_URL', 'https://aat-api-dev.elasticbeanstalk.com')
    //.constant('API_URL', 'https://aat-api-prod.elasticbeanstalk.com')
    //.constant('API_URL', 'http://localhost:3000')
    .constant('API_URL', 'https://prod-api.aws.aat.org.uk')

    //.constant('AUTH_TOKEN', 'aat-auth-token')

    .run(appRun);

// Inject Deps
appRun.$inject = ['$rootScope', '$location'];


/**
 *
 * App RUN scope
 *
 * @param $rootScope
 * @param $location
 *
 */

function appRun($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        // Check token
        var token = localStorage.getItem('aat-auth-token');

        if (next.access.requiresLogin == true) {

            //console.log("@RUN - " - token);

            if (!token) {
                console.log("REQUIRES Login + user has no JWT token...");
                event.preventDefault();
                $location.path("/login");
            }

        }

    });

}