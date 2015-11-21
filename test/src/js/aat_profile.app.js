/**
 * Created by atharkhan on 29/09/15.
 */
(function() {

    'use strict';

    angular.module('aat_user_profile', [
        'ngRoute',
        'angular-cache',
        'formly',
        'formlyBootstrap',
        'ui.bootstrap',
        'ngMessages',
        'ngAria',
        'lumx',
        'formlyLumx'
    ])
        .constant('is', window.is)
        .constant('formlyExampleApiCheck', apiCheck())
        .constant('TITLE_SALUTATIONS', [
            {
                'name': 'Mr',
                'value': 'Mr'
            },
            {
                'name': 'Mrs',
                'value': 'Mrs'
            },
            {
                'name': 'Miss',
                'value': 'Miss'
            },
            {
                'name': 'Ms',
                'value': 'Ms'
            }
        ]);
}());