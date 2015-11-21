/**
 * Created by atharkhan on 29/09/15.
 */
(function(){

    'use strict';

    /**
     * Config for forms module
     * @config
     * @param formlyConfigProvider
     * @param formlyExampleApiCheck
     * @param CacheFactoryProvider
     * @description Adding the custom type and wrapper for angular formly
     * @link http://docs.angular-formly.com/docs/custom-templates
     * @provider matchfield and doNotMatch @example http://angular-formly.com/#/example/other/matching-two-fields
     *
     */
    function config(formlyConfigProvider, formlyExampleApiCheck, CacheFactoryProvider) {

        angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

        formlyConfigProvider.setWrapper({
            name: 'loader',
            template: [
                '<formly-transclude></formly-transclude>',
                '<span class="glyphicon glyphicon-refresh loader" ng-show="to.loading"></span>'
            ].join(' ')
        });

        formlyConfigProvider.setType({
            name: 'input-loader',
            extends: 'input',
            wrapper: ['loader']
        });

        formlyConfigProvider.setType({
            name: 'custom',
            template: '<div class="form-group"><label for="{{::id}}">{{options.templateOptions.label}}</label><input id="{{::id}}" name="{{::id}}" class="form-control" ng-model="model[options.key]"/></div>'
        });
        formlyConfigProvider.setType({
            name: 'input',
            template: '<div><input ng-if="!formState.readOnly" class="form-control" ng-model="model[options.key]"><p ng-if="formState.readOnly" class="form-control-static">{{model[options.key]}}</p></div>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            overwriteOk: true
        });
        formlyConfigProvider.setWrapper({
            name: 'validation',
            types: ['input', 'select', 'typeahead'],
            template: '<formly-transclude></formly-transclude><div ng-messages="fc.$error" ng-if="form.$submitted || options.formControl.$touched" class="error-messages"><div ng-message="{{ ::name }}" ng-repeat="(name, message) in ::options.validation.messages" class="label label-danger message">{{ message(fc.$viewValue, fc.$modelValue, this)}}</div></div>'
        });
        formlyConfigProvider.setType({
            name: 'matchField',
            apiCheck: function() {
                return {
                    data: {
                        fieldToMatch: formlyExampleApiCheck.string
                    }
                };
            },
            apiCheckOptions: {
                prefix: 'matchField type'
            },
            defaultOptions: function matchFieldDefaultOptions(options) {
                return {
                    extras: {
                        validateOnModelChange: true
                    },
                    validators: {
                        fieldMatch: {
                            expression: function(viewValue, modelValue, fieldScope) {

                                var value = modelValue || viewValue;

                                var fieldToMatch = options.data.fieldToMatch;

                                var fieldToMatchValue = fieldScope.$parent.model[fieldToMatch];

                                return value === fieldToMatchValue;

                            },
                            message: options.data.matchFieldMessage || '"The specified fields do not match."'
                        }
                    }
                };
            }
        });

        formlyConfigProvider.setType({
            name: 'selectValidate',
            defaultOptions: function selectFieldDefaultOptions(options) {
                return {
                    extras: {
                        validateOnModelChange: true
                    },
                    validators: {
                        selectValidate: {
                            expression: function(viewValue, modelValue, fieldScope) {
                                return modelValue !== 'select';
                            },
                            message: options.data.selectFieldMessage || '"Select a value"'
                        }
                    }
                };
            }
        });

        formlyConfigProvider.setType({
            name: 'doNotMatch',
            apiCheck: function() {
                return {
                    data: {
                        fieldToMatch: formlyExampleApiCheck.string
                    }
                };
            },
            apiCheckOptions: {
                prefix: 'doNotMatch type'
            },
            defaultOptions: function doNotMatchFieldDefaultOptions(options) {
                return {
                    extras: {
                        validateOnModelChange: true
                    },
                    validators: {
                        fieldMatch: {
                            expression: function(viewValue, modelValue, fieldScope) {

                                var value = modelValue || viewValue;

                                var fieldToNotMatch = options.data.fieldToNotMatch;

                                var fieldToNotMatchValue = fieldScope.$parent.model[fieldToNotMatch];

                                return (value !== fieldToNotMatchValue);

                            },
                            message: options.data.doNotMatchFieldMessage || '"The specified fields do not match."'
                        }
                    }
                };
            }
        });

        /**
         * @description custom type for type a haed the address by organisation name, angular formly
         * @example http://angular-formly.com/#/example/bootstrap-specific/grouped-typeahead
         *
         */
        formlyConfigProvider.setType({
            name: 'typeahead',
            template: '<script type="text/ng-template" id="org.html"><a><div><span style="display:block;" class="organisation" bind-html-unsafe="match.model.aat_organisation | typeaheadHighlight:query"></span><span bind-html-unsafe="match.model.address | typeaheadHighlight:query"></span> &middot;</div></a></script><input type="text" data-ng-model="fc.selectOrganisation" typeahead="org as org.aat_organisation for org in getOrganisations($viewValue) | filter:$viewValue | limitTo:8" typeahead-editable="false" typeahead-on-select="onSelect($item, $model, $label)" class="form-control" typeahead-template-url="org.html">',
            wrapper: ['bootstrapLabel', 'bootstrapHasError']
        });
        /**
         * @description custom type for find the address by postcode, angular formly
         * @example http://angular-formly.com/#/example/bootstrap-specific/grouped-typeahead
         *
         */
        formlyConfigProvider.setType({
            name: 'findByPostcode',
            template: '<button type="button" class="btn btn-search-address btn-default btn-" value="Find address" data-ng-click="getAddress()"><span class=" button-icon fa fa-search"></span><span class="button-text">Find address</span></button><br/>'
        });
        /**
         * @description multiselect custom type for selecting the door number by postcode, angular formly
         * @example http://angular-formly.com/#/example/bootstrap-specific/grouped-typeahead
         *
         */
        formlyConfigProvider.setType({
            name: 'multiselect',
            extends: 'select',
            defaultOptions: {
                ngModelAttrs: {
                    'true': {
                        value: 'multiple'
                    }
                }
            }
        });

    }
    /**
     * @description adding the custom validation type
     * @see is.js @line 308
     * @injector
     *
     */
// injector
    function run(formlyConfig, formlyValidationMessages, is) {

        addTypeForValidator('alphaNumeric');
        addTypeForValidator('email');
        addTypeForValidator('url');
        addTypeForValidator('date');
        addTypeForValidator('number');
        addTypeForValidator('AATPhone');
        addTypeForValidator('uln');
        addTypeForValidator('scn');
        addTypeForValidator('AATPassword');
        addTypeForValidator('ukPostCode');

        /**
         * @description custom validation message for different validation type
         * @see is.js @line 308
         * @param validatorName
         * @return{string}
         *
         */
        function addTypeForValidator(validatorName) {
            var validators = {};
            var validationMassages = {
                alphaNumeric: "Enter number and alphabets only",
                required: "Enter a value",
                email: "Enter a valid email address",
                url: "Enter a valid URL",
                date: "Enter a valid date",
                number: "Enter a valid number",
                AATPhone: "Enter a valid phone number",
                equalTopwd: "Passwords do not match",
                AATPassword: "Enter a valid AAT Password",
                ukPostCode: "Supply a valid UK postcode",
                uln: "Enter at least 10 characters",
                scn: "Enter at least 9 characters"

            };

            validators[validatorName] = {
                expression: is[validatorName],
                message: '"' + validationMassages[validatorName] + '"'
            };
            //
            formlyConfig.setType({
                name: validatorName,
                defaultOptions: {
                    validators: validators
                }
            });
        }
    }

    angular.module('aat_user_profile')
        .config(config)
        .run(run);
}());