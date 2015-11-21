/**
 *
 * ABOUT COMPONENT
 *
 * @file
 * Provides the about section for the website.
 *
 */


'use strict';

angular.module('project.about', ['ngRoute'])

    .config( config )

    .controller('AboutController', AboutController);

/**
 *
 * About Controller
 *
 * @constructor
 */
function AboutController(){

    var vm = this;

    vm.link = "This is set within the controller";

}

function config($routeProvider, $locationProvider) {

    $routeProvider.when('/about', {
        title: 'About',
        templateUrl: './site/components/about/about.tpl.html',
        controller: 'AboutController',
        controllerAs: 'vm',
        access: {
            requiresLogin: false,
            roles: []
        }
    });

}