/**
 * Created by atharkhan on 29/09/15.
 */
(function() {

    'use strict';

    /**
     * Forms Controller
     * @controller
     * @name User.Profile.App
     * @param $scope
     * @param emailAddressValidationService
     * @param TITLE_SALUTATIONS
     * @param $timeout
     * @param userProfileService
     * @param organisationService
     * @param postCodeService
     * @param $routeParams
     * @param formlyVersion
     * @param is
     * @param formlyExampleApiCheck
     * @constructor
     * @module ng
     * @example http://angular-formly.com/
     * @description
     * This controller is using as the main controller of their app. It contains various of objects, variables, modules and functions.
     * all of the forms are creating using this controller and
     * @link http://angular-formly.com/
     * @ngdoc http://docs.angular-formly.com/
     */
    function FormsCtrl($scope, $timeout, $routeParams, formlyVersion, is, formlyExampleApiCheck, userProfileService, organisationService, postCodeService, emailAddressValidationService, TITLE_SALUTATIONS) {

        var fc = this;
        /**
         * forms options
         */
        fc.generalOptions = {};
        fc.emailOptions = {};
        fc.passwordOptions = {};
        fc.confirmationModel = {};
        fc.addMoreEmployment = false;
        fc.displayEmploymentOptions = false;
        /**
         * employment Data Model flags
         */
        fc.employmentDataModel = false;
        fc.employmentRemoveConfirmation = false;
        fc.removing = true;
        fc.employmentBtn = false;

        /**
         * variable assignment
         */
        /** Unsaved variables flag */
        fc.submitContactDetailsSuccessfull = false;
        fc.unsavedPersonalDetails = false;
        fc.unsavedContactDetails = false;
        fc.unsavedStudyDetails = false;
        fc.unsavedEmailPasswordDetails = false;
        fc.unsavedEmploymentDetails = false;
        fc.unsavedUserStatus = false;
        fc.unsavedUserRoles = false;

        /** Submited flag
         * @type {boolean}
         */
        fc.submitPersonalDetails = false;
        fc.submitContactDetails = false;
        fc.submitStudyDetails = false;
        fc.submitNewEmail = false;
        fc.submitNewPassword = false;
        fc.submitemploymentDetails = false;

        /** populated Employment buttons flag
         ** @type {boolean}
         */
        fc.employmentDetailsRemove = false;
        fc.employmentDetailsEdit = false;

        /** Employment details section */
        fc.newEmploymentDetails = false;
        fc.employmentDetails = false;
        //fc.selfEmploymentDetails = false;
        fc.seekingWork = false;
        /** each collapse buttons */
        fc.licenceDetailsbt = true;
        fc.personalDetailsPanelbtn = true;
        fc.emailPasswordPanelbtn = true;
        fc.contactPanelbtn = true;
        fc.employmentPanelbtn = true;
        fc.studyPanelbtn = true;
        fc.userStatusBtn = true;
        fc.userRolesBtn = true;
        fc.centreMembershipBtn = true;

        fc.message = null;
        fc.userID = $routeParams.userid;

        /**
         * funcation assignment
         */
        fc.personalDetailsOnSubmit = personalDetailsOnSubmit;
        //fc.studyQualificationFormFieldsFormFields = studyQualificationOnSubmit;
        fc.newEmailOnSubmit = newEmailOnSubmit;
        fc.newPasswordOnSubmit = newPasswordOnSubmit;
        fc.contactDetailsOnSubmit = contactDetailsOnSubmit;
        fc.employmentDetailsOnSubmit = employmentDetailsOnSubmit;
        fc.studyOnSubmit = studyOnSubmit;
        fc.userRolesOnSubmit = userRolesOnSubmit;
        fc.userStatusOnSubmit = userStatusOnSubmit;
        fc.clickEditEmployment = clickEditEmployment;
        fc.clickAddMoreEmployment = clickAddMoreEmployment;
        fc.clickCancelEditEmployment = clickCancelEditEmployment;
        fc.clickCancelAddEmployment = clickCancelAddEmployment;
        fc.clickRemoveEmployment = clickRemoveEmployment;
        fc.closePersonalDetails = closePersonalDetails;
        fc.closeContactDetails = closeContactDetails;
        fc.closeStudyDetails = closeStudyDetails;
        fc.closeUserRoles = closeUserRoles;
        fc.closeUserStatus = closeUserStatus;
        fc.closeEmailAndPasswordDetails = closeEmailAndPasswordDetails;
        fc.closeEmploymentDetails = closeEmploymentDetails;
        fc.clickEditContactDetails = clickEditContactDetails;
        fc.clickEmploymentOption = clickEmploymentOption;
        fc.updateUlnScnFields = updateUlnScnFields;
        fc.redirectToRegService = redirectToRegService;
        fc.redirectToCentreMembershipEdit = redirectToCentreMembershipEdit;
        fc.deleteEmployment = deleteEmployment;
        //fc.editEmployment = editEmployment;
        /**
         ** @type {boolean}
         *  panels flags
         */
        fc.selectAddressOption = false;
        fc.postCodeValue = false;
        fc.postCodeValueEmployment = false;
        fc.postCodeValueContact = false;
        fc.profileServiceResponse = false;
        fc.displayEmploymentSummary = true;
        fc.editAddEmploymentOption = true;
        fc.displayEmploymentOptions = false;
        fc.isUnsavedEmployment = false;
        fc.isAdmin = false;

        /**
         ** @type {array}
         */
        fc.listOfAddress = [];
        fc.listOfAddressContact = [];
        fc.userRoles = [];
        fc.selectOrganisation = {};
        fc.unsaved = {};
        fc.saved = {};
        fc.additional_id = {model: {}};


        userProfileService.getProfileServiceData()
            .then(getProfileSuccess);

        /**
         *
         * @param response
         * @param{object}
         * @return
         * @description
         * this function is controlling the user profile section including of creating the forms, getting the data, doing the validation and updating the model.
         *
         */
        function getProfileSuccess(response) {

            // Personal profile.
            fc.personalProfileData = response.profileData.personal;

            // Employment profile data.
            formatEmploymentData(fc.personalProfileData);

            // Options set for country and county dropdown list.
            fc.countryList = Object.keys(response.countryList['country']).map(function(key) {return response.countryList['country'][key];});
            fc.countyList = Object.keys(response.countryList['county']).map(function(key) {return response.countryList['county'][key];});

            // Programme registration(s).
            if (response.progRegData && Object.keys(response.progRegData).length) {

                fc.programmeReg = response.progRegData.programme_reg;
                fc.latestProgrammeReg = response.progRegData.latest_programme_reg;
            }

            if (response.mipServiceData && Object.keys(response.mipServiceData).length) {
                fc.mipServiceData = response.mipServiceData;
            }

            if (response.profileData.additional_id) {

                fc.additional_id.model = response.profileData.additional_id;
            }

            if (fc.personalProfileData.address1_stateorprovince!== undefined && fc.personalProfileData.address1_stateorprovince === '') {
                fc.personalProfileData.address1_stateorprovince = 'select';
            }

            if (response.profileData.hasOwnProperty('is_admin')) {

                fc.userRolesModel.user_roles = response.profileData.user_roles;
                fc.userRoles = Object.keys(response.profileData.roles).map(function(key) {return response.profileData.roles[key];});
                fc.userRolesString = response.profileData.user_roles_string;

                fc.userStatusModel.user_status = response.profileData.user_status;
                fc.userStatusText = (response.profileData.user_status === 'true') ? 'Active' : 'Blocked';

                if (response.profileData.hasOwnProperty('centre_membership_markup')) {
                    fc.centreMembershipMarkup = response.profileData.centre_membership_markup;
                }
                else {
                    fc.centreMembershipMarkup = '<p>Not available</p>';
                }

                fc.isAdmin = true;
            }

            fc.profileServiceResponse = angular.copy(response);

            /**
             * Users profile fields
             */
            fc.personalDetailsFields = [

                {
                    key: 'e2lrgt_title',
                    type: 'select',
                    templateOptions: {
                        label: 'Title',
                        options: TITLE_SALUTATIONS,
                        disabled: true
                    }
                },
                {
                    key: 'firstname',
                    type: 'input',
                    templateOptions: {
                        label: 'First Name',
                        disabled: true
                    }
                },
                {
                    key: 'middlename',
                    type: 'input',
                    templateOptions: {
                        label: 'Middle Name',
                        disabled: true
                    }
                },
                {
                    key: 'lastname',
                    type: 'input',
                    templateOptions: {
                        label: 'Last Name',
                        disabled: true
                    }
                },
                {
                    key: 'aat_otherdesignatoryletters',
                    type: 'input',
                    templateOptions: {
                        label: 'Non-AAT designatory letters',
                        placeholder: 'Please enter your Non-AAT designatory letters',
                        maxlength: 50
                    }
                }
            ];
            fc.newEmailFormFields = [
                {
                    key: 'emailaddress1',
                    type: 'input',
                    templateOptions: {
                        type: 'email',
                        label: 'New email',
                        maxlength: 100,
                        required: true,
                        placeholder: 'Enter your new email address',
                        description: 'A valid email address. All emails from the system will be sent to this address. The email address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by email'
                        //onKeydown: function(value, options) {
                        //  options.validation.show = false;
                        //},
                        //onBlur: function(value, options) {
                        //  options.validation.show = true;
                        //}
                    },
                    asyncValidators: {
                        validEmail: {
                            expression: function($viewValue, $modelValue, scope) {
                                scope.options.templateOptions.loading = true;

                                return $timeout(function() {

                                    if ($modelValue && $modelValue !== 'undefined') {

                                        return emailAddressValidationService.validateEmailAddress($modelValue).error(function() {
                                            throw new Error('already exist.');
                                        });
                                    }
                                }, 1000);

                            },
                            message: '"Email address already exists."'
                        }
                    },
                    modelOptions: {
                        updateOn: 'blur'
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter email address';
                            }
                        }
                    }
                },
                {
                    key: 'confirm_emailaddress1',
                    optionsTypes: ['matchField'],
                    type: 'input',
                    templateOptions: {
                        type: 'email',
                        maxlength: 100,
                        label: 'Confirm New email',
                        //required: true,
                        placeholder: 'Re-enter your new email'
                    },
                    data: {
                        fieldToMatch: 'emailaddress1',
                        modelToMatch: fc.newEmailFormFields,
                        matchFieldMessage: '"Email address do not match"'
                    },
                    expressionProperties: {
                        'reset4': function(viewValue, modelValue, scope) {
                            if (viewValue !== scope.options.initialValue) {
                                fc.submitNewEmail = true;
                            }
                        }
                    }
                },
                {
                    key: 'pass',
                    type: 'input',
                    templateOptions: {
                        label: 'Confirm Password',
                        type: 'password',
                        placeholder: 'Enter your password',
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter password';
                            }
                        }
                    }
                }
            ];
            fc.newPasswordFormFields = [
                {
                    key: 'pass',
                    type: 'input',
                    //optionsTypes: ['AATPassword'],
                    templateOptions: {
                        label: 'Current password',
                        maxlength: 50,
                        type: 'password',
                        placeholder: 'Enter your current password',
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter password';
                            }
                        }
                    }
                },
                {
                    key: 'new_pass',
                    type: 'input',
                    optionsTypes: ['AATPassword', 'doNotMatch'],
                    templateOptions: {
                        label: 'New password',
                        type: 'password',
                        maxlength: 50,
                        placeholder: 'Enter your new password',
                        description: 'Your password must contain both letters and numbers (at least one uppercase, one lowercase and one number) with no spaces or special characters. It must be at least 8 characters long.'
                    },
                    data: {
                        fieldToNotMatch: 'pass',
                        fieldToDisable: 'confirm_new_pass',
                        modelToMatch: fc.newPasswordFormFields,
                        doNotMatchFieldMessage: '"Enter a different password"'
                    }
                },
                {
                    key: 'confirm_new_pass',
                    type: 'input',
                    optionsTypes: ['matchField'],
                    templateOptions: {
                        label: 'Confirm new Password',
                        type: 'password',
                        maxlength: 50,
                        placeholder: 'Re-enter your new password'
                    },
                    data: {
                        fieldToMatch: 'new_pass',
                        modelToMatch: fc.newPasswordFormFields,
                        matchFieldMessage: '"New passwords do not match"'
                    }
                }
            ];
            fc.contactDetailsFormFields = [
                {
                    key: 'aat_countryid',
                    type: 'select',
                    defaultValue: 'GBR',
                    templateOptions: {
                        label: 'Country',
                        options: fc.countryList,
                        required: true,
                        valueProp: 'value'
                    },
                    expressionProperties: {
                        'resetCountry': function(viewValue, modelValue, scope) {

                            if (modelValue) {

                                var postCode = findField(scope.fields, 'key', 'address1_postalcode');
                                var findAddress = findField(scope.fields, 'key', 'find_address');
                                var county = findField(scope.fields, 'key', 'address1_stateorprovince');

                                if (viewValue !== 'GBR') {
                                    postCode.hide = true;
                                    findAddress.hide = true;
                                    county.hide = true;
                                }
                                else {
                                    postCode.hide = false;
                                    findAddress.hide = false;
                                    county.hide = false;
                                }
                            }

                        }
                    }
                },
                {
                    key: 'address1_postalcode',
                    className: 'post-code',
                    type: 'input',
                    optionsTypes: ['ukPostCode'],
                    templateOptions: {
                        label: 'Postcode'
                        //placeholder: 'Enter your postcode'
                    }
                },
                {
                    key: 'find_address',
                    type: 'findByPostcode',
                    link: function(scope) {

                        scope.getAddress = function() {

                            if (isFieldValid(scope.form, 'address1_postalcode')) {

                                jQuery('.btn-search-address').find('span:first-child').addClass('fa-refresh fa-spin');

                                var postCode = getFieldValue(scope.form, 'address1_postalcode');

                                return postCodeService.getPostCodeData(postCode).then(function(response) {

                                    var select_address = findField(scope.fields, 'key', 'select_address');
                                    select_address.templateOptions.options = [];

                                    response.forEach(function(arrayItem) {

                                        var option = {
                                            name: arrayItem.StreetAddress + ' ' + arrayItem.Place,
                                            value: arrayItem.Id
                                        };

                                        select_address.templateOptions.options.push(option);

                                    });
                                    fc.personalProfileData.selectAddressOption = true;
                                    jQuery('.btn-search-address').find('span:first-child').removeClass('fa-refresh fa-spin');
                                });
                            }

                            return false;
                        };
                    }
                },
                {
                    key: 'select_address',
                    className: 'address-list',
                    type: 'multiselect',
                    templateOptions: {
                        options: [],
                        label: 'Select an address',
                        valueProp: 'value',
                        onChange: function($viewValue, $modelValue, scope) {

                            var select_address = findField(scope.fields, 'key', 'select_address');

                            select_address.templateOptions.options = [];

                            fc.personalProfileData.selectAddressOption = false;

                            postCodeService.getAddressDetails(scope.model.select_address).then(function(response) {

                                if (response.Company.length > 0) {
                                    fc.personalProfileData.address1_line1 = response.Company;
                                }
                                else {
                                    fc.personalProfileData.address1_line1 = response.Line1;
                                }
                                fc.personalProfileData.address1_line2 = response.Line2;
                                fc.personalProfileData.address1_line3 = response.Line3;
                                fc.personalProfileData.address1_city = response.PostTown;
                                fc.personalProfileData.address1_stateorprovince = (response.County !== '') ? response.County : 'select';
                                fc.personalProfileData.address1_postalcode = response.Postcode;
                                fc.personalProfileData.aat_countryid = 'GBR';

                            });
                        }
                    },
                    hideExpression: '!model.selectAddressOption'
                },
                {
                    key: 'address1_line1',
                    className: 'address',
                    type: 'input',
                    templateOptions: {
                        label: 'Address',
                        placeholder: '',
                        maxlength: 100,
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter address';
                            }
                        }
                    }

                },
                {
                    key: 'address1_line2',
                    type: 'input',
                    templateOptions: {
                        label: '',
                        placeholder: '',
                        maxlength: 100
                    }

                },
                {
                    key: 'address1_line3',
                    type: 'input',
                    templateOptions: {
                        label: '',
                        placeholder: '',
                        maxlength: 100
                    }

                },
                {
                    key: 'address1_city',
                    type: 'input',
                    templateOptions: {
                        label: 'Town/region',
                        placeholder: '',
                        required: true,
                        maxlength: 100
                    },
                    expressionProperties: {

                        'hideCountyEmp': function($viewValue, $modeValue, scope) {

                            if ($modeValue) {
                                var county = findField(scope.fields, 'key', 'address1_stateorprovince');
                                var country = getFieldValue(scope.form, 'aat_countryid');

                                if ($modeValue.toLowerCase() === 'london' && country === 'GBR' || (country && country !== 'GBR')) {
                                    county.hide = true;
                                }
                                else {
                                    // If postcode search result do not contain county then will need to $touched the
                                    // field so that user can see the error in the form. Form submit buttom remains disabled
                                    // until all the fields are valid.
                                    var countyField = getField(scope.form, 'address1_stateorprovince');
                                    if (countyField) {
                                        countyField.$setTouched();
                                    }
                                }
                            }
                        }
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter town or region';
                            }
                        }
                    }
                },
                {
                    key: 'address1_stateorprovince',
                    type: 'select',
                    //optionsTypes: ['selectValidate'],
                    templateOptions: {
                        label: 'County:',
                        options: fc.countyList,
                        required: true
                    },
                    validators: {
                        selectValidate: {
                            expression: function(viewValue, modelValue) {
                                return modelValue !== 'select';
                            },
                            message: '"Select county"'
                        }
                    }
                },
                {
                    key: 'exampleDirective',
                    template: '<p></p><h5><strong>Telephone numbers:<p></p></strong></h5><span >Only one valid telephone number is required</span></br></div></br>'
                },
                {
                    key: 'mobilephone',
                    type: 'input',
                    optionsTypes: ['AATPhone'],
                    templateOptions: {
                        label: 'Daytime phone number',
                        placeholder: 'Please enter your daytime phone number',
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter a phone number';
                            }
                        }
                    },
                    expressionProperties: {
                        /**
                         * Seting the required option.
                         *
                         * @see [Formly Expressions]{@link http://docs.angular-formly.com/docs/formly-expressions}
                         * @returns {boolean}
                         */
                        'templateOptions.required': function(viewValue, modelValue, scope) {
                            var value = getFieldValue(scope.form, 'telephone2');
                            return (value && value.length && value !== 'undefined') ? false : true;
                        }

                    }
                },
                {
                    key: 'telephone2',
                    type: 'input',
                    optionsTypes: ['AATPhone'],
                    templateOptions: {
                        label: 'Mobile number',
                        placeholder: 'Please enter your mobile phone number',
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter a mobile number';
                            }
                        }
                    },
                    expressionProperties: {
                        'templateOptions.required': function(viewValue, modelValue, scope) {
                            var value = getFieldValue(scope.form, 'mobilephone');
                            return (value && value.length && value !== 'undefined') ? false : true;
                        }
                    }
                }
            ];
            fc.employmentDetailsFormFields = [
                {
                    key: 'aat_selfemployed',
                    type: 'checkbox',
                    className: 'main-employment',
                    templateOptions: {
                        label: 'These are my self-employed practice details'
                    },
                    hideExpression: 'true'
                },
                {
                    key: 'aat_businesstype',
                    type: 'select',
                    //optionsTypes: ['selectValidate'],
                    templateOptions: {
                        label: 'Type of business',
                        valueProp: "value",
                        options: [
                            {
                                'name': 'Please select',
                                'value': 'select'
                            },
                            {
                                'name': 'Limited Liability Partnership',
                                'value': '811000003'
                            },
                            {
                                'name': 'Limited Company',
                                'value': '811000001'
                            },
                            {
                                'name': 'Partnership',
                                'value': '811000002'
                            },
                            {
                                'name': 'Sole Trader',
                                'value': '811000000'
                            }
                        ],
                        required: true
                    },
                    validators: {
                        selectValidate: {
                            expression: function(viewValue, modelValue) {
                                return modelValue !== 'select';
                            },
                            message: '"Select business type"'
                        }
                    },
                    //data: {
                    //  selectFieldMessage: '"Select business type"'
                    //},
                    hideExpression: '!model.aat_selfemployed || model.aat_selfemployed==undefined'
                },
                {
                    key: 'aat_mainemployment',
                    type: 'checkbox',
                    className: 'main-employment',
                    //hideExpression: function ($viewValue, $modelValue, scope) {
                    //  return !scope.model.selfEmployedFields;
                    //},
                    templateOptions: {
                        label: 'This is my main employment',
                        description: "If you're a MIP, this should be your main practice address"
                    }
                },
                {
                    key: 'aat_jobtitle',
                    className: 'job-title',
                    //optionsTypes: ['alphaNumeric'],
                    type: 'input',
                    templateOptions: {
                        label: 'Job title',
                        required: true,
                        maxlength: 50
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter job title';
                            }
                        }
                    }
                },
                {
                    key: 'aat_organisation',
                    type: 'typeahead',
                    templateOptions: {
                        label: 'Company',
                        required: true
                    },
                    link: function(scope) {

                        scope.getOrganisations = function(term) {

                            if (term && term.length > 2) {
                                return organisationService.getOrganisationData(term).then(function(response) {
                                        return Object.keys(response).map(function(key) {return response[key];});

                                    }
                                    //  , function(response) {
                                    //
                                    //}
                                );
                            }
                        };

                        scope.onSelect = function($item, $model) {

                            for (var field in $model) { fc.employmentDataModel[field] = $model[field]; }

                            // Reset county field, if empty.
                            if (fc.employmentDataModel.aat_address_stateorprovince === '' || fc.employmentDataModel.aat_address_stateorprovince === null) {
                                fc.employmentDataModel.aat_address_stateorprovince = 'select';
                            }
                        };

                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter company';
                            }
                        }
                    }
                },
                {
                    key: 'aat_address_country',
                    type: 'select',
                    defaultValue: 'GBR',
                    templateOptions: {
                        label: 'Country',
                        options: fc.countryList,
                        required: true,
                        valueProp: 'value'
                    },
                    expressionProperties: {
                        'resetCountry': function(viewValue, modelValue, scope) {

                            if (modelValue) {

                                var postCode = findField(scope.fields, 'key', 'aat_address_postalcode');
                                var findAddress = findField(scope.fields, 'key', 'find_address');
                                var county = findField(scope.fields, 'key', 'aat_address_stateorprovince');

                                if (viewValue !== 'GBR') {
                                    postCode.hide = true;
                                    findAddress.hide = true;
                                    county.hide = true;
                                }
                                else {
                                    postCode.hide = false;
                                    findAddress.hide = false;
                                    county.hide = false;
                                }
                            }

                        }
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Select country';
                            }
                        }
                    }
                },
                {
                    key: 'aat_address_postalcode',
                    className: 'post-code',
                    type: 'input',
                    optionsTypes: ['ukPostCode'],
                    templateOptions: {
                        label: 'Postcode',
                        onFocus: function($viewValue, $modelValue, scope) {
                            var company = getField(scope.form, 'aat_organisation');
                            // If user navigates away from the field without selecting the org form options then reset
                            // the field so that user can see the error in the form.
                            if (company && $modelValue !== undefined && company.$valid === false) {
                                company.$setViewValue('');
                            }
                        }
                        //placeholder: 'Enter your postcode'
                    }
                },
                {
                    key: 'find_address',
                    type: 'findByPostcode',
                    link: function(scope) {

                        scope.getAddress = function() {

                            if (isFieldValid(scope.form, 'aat_address_postalcode')) {

                                jQuery('.btn-search-address').find('span:first-child').addClass('fa-refresh fa-spin');

                                var postCode = getFieldValue(scope.form, 'aat_address_postalcode');

                                return postCodeService.getPostCodeData(postCode).then(function(response) {

                                    if (!response) {return false;}

                                    var select_address = findField(scope.fields, 'key', 'select_address');

                                    select_address.templateOptions.options = [];

                                    response.forEach(function(arrayItem) {

                                        var option = {
                                            name: arrayItem.StreetAddress + ' ' + arrayItem.Place,
                                            value: arrayItem.Id
                                        };
                                        select_address.templateOptions.options.push(option);


                                    });
                                    fc.employmentDataModel.selectAddressOption = true;
                                    jQuery('.btn-search-address').find('span:first-child').removeClass('fa-refresh fa-spin');
                                });
                            }
                        };
                    }
                },
                {
                    key: "select_address",
                    className: 'address-list',
                    type: "multiselect",
                    templateOptions: {
                        options: [],
                        label: "Select an address",
                        placeholder: 'Select your address',
                        valueProp: "value",
                        onChange: function($viewValue, $modelValue, scope) {

                            fc.employmentDataModel.selectAddressOption = false;

                            postCodeService.getAddressDetails(scope.model.select_address).then(function(response) {

                                fc.employmentDataModel.aat_address_line1 = (response.Company.length > 0) ? response.Company : response.Line1;

                                fc.employmentDataModel.aat_address_line2 = response.Line2;
                                fc.employmentDataModel.aat_address_line3 = response.Line3;
                                fc.employmentDataModel.aat_address_city = response.PostTown;
                                fc.employmentDataModel.aat_address_stateorprovince = (response.County !== '') ? response.County : 'select';
                                fc.employmentDataModel.aat_address_postalcode = response.Postcode;
                                fc.employmentDataModel.aat_address_country = 'GBR';


                            });
                        }
                    },
                    hideExpression: '!model.selectAddressOption'
                },
                {
                    key: 'aat_address_line1',
                    type: 'input',
                    className: 'address',
                    templateOptions: {
                        label: 'Address',
                        placeholder: '',
                        maxlength: 100,
                        required: true
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter address';
                            }
                        }
                    }
                },
                {
                    key: 'aat_address_line2',
                    type: 'input',
                    templateOptions: {
                        label: '',
                        placeholder: '',
                        maxlength: 100
                    }
                },
                {
                    key: 'aat_address_line3',
                    type: 'input',
                    templateOptions: {
                        label: '',
                        placeholder: '',
                        maxlength: 100
                    }
                },
                {
                    key: 'aat_address_city',
                    type: 'input',
                    templateOptions: {
                        label: 'Town/region',
                        required: true,
                        maxlength: 100
                    },
                    expressionProperties: {
                        'hideCountyEmp': function($viewValue, $modeValue, scope) {

                            if ($modeValue) {
                                var county = findField(scope.fields, 'key', 'aat_address_stateorprovince');
                                var country = getFieldValue(scope.form, 'aat_address_country');

                                if ($modeValue.toLowerCase() === 'london' && country === 'GBR' || (country && country !== 'GBR')) {
                                    county.hide = true;
                                }
                                else {
                                    // If postcode search result do not contain county then will need to $touched the
                                    // field so that user can see the error in the form. Form submit buttom remains disabled
                                    // until all the fields are valid.
                                    var countyField = getField(scope.form, 'aat_address_stateorprovince');
                                    if (countyField) {
                                        countyField.$setTouched();
                                    }
                                }
                            }
                        }
                    },
                    validation: {
                        messages: {
                            required: function() {
                                return 'Enter town or region';
                            }
                        }
                    }
                },
                {
                    key: 'aat_address_stateorprovince',
                    type: 'select',
                    //optionsTypes: ['selectValidate'],
                    templateOptions: {
                        label: 'County:',
                        options: fc.countyList,
                        required: true
                    },
                    validators: {
                        selectValidate: {
                            expression: function(viewValue, modelValue) {
                                return modelValue !== 'select';
                            },
                            message: '"Select county"'
                        }
                    }
                },
                {
                    key: 'aat_website',
                    type: 'input',
                    //optionsTypes: ['url'],
                    templateOptions: {
                        label: 'Company website',
                        maxlength: 150
                    },
                    validators: {
                        url: {
                            expression: function(viewValue, modelValue) {
                                var value = modelValue || viewValue;
                                if (value && value !== 'undefined' && value.length) {
                                    return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(value);
                                }
                                return true;
                            },
                            message: '"Enter a valid url"'
                        }
                    }
                },
                {
                    key: 'aat_inclideinmipdirectory',
                    type: 'checkbox',
                    hideExpression: '!model.aat_selfemployed',
                    templateOptions: {
                        label: 'Show my details on the MIP directory (if you are not a member in practice your details will not show) '
                    }
                }
            ];
            fc.studyFormFields = [
                {
                    key: 'aat_value_uln',
                    type: 'input',
                    optionsTypes: ['uln'],
                    templateOptions: {
                        label: 'Unique Learner Number (ULN) (if applicable)',
                        placeholder: '',
                        description: ''
                    },
                    expressionProperties: {
                        'resetSCN': function(viewValue, modelValue, scope) {

                            if (modelValue && !scope.model.pending_uln && !scope.model.rejected_uln) {
                                // Remove SCN if there is a valid ULN.
                                updateUlnScnFields(scope, 'aat_value_scn');
                            }

                        },
                        'templateOptions.disabled': 'model.aat_value_scn',
                        'templateOptions.description': function(viewValue, modelValue, scope) {
                            if (scope.model.pending_uln) {
                                return scope.options.templateOptions.description === scope.model.description;
                            }
                            else if (scope.model.rejected_uln) {
                                return scope.options.templateOptions.description === scope.model.description;
                            }
                        }
                    },
                    hideExpression: 'model.pending_scn || model.rejected_scn'
                },
                {
                    key: 'exampleDirective',
                    template: '<div class="form-type-alphafield form-item-personal-details-user-first-name form-item form-group"> <div popover-placement="left" popover-append-to-body="true" popover-trigger="mouseenter" popover="All students in England and Wales are given a unique, 10-digit ULN when they start their studies to track theirlearning records. If you have not been issued a ULN, please leave this field blank.If you have entered a ULN,it will only be verified if the name on our database appears exactly as it does on your ID, ie Passport, driving license orbirth certificate. If verified, it will also appear on your AAT certificates." popover-title="Unique Learner Number(ULN)" class="aat-popover-generated label label-info " data-original-title="" title="">More info</div></div></br>',
                    hideExpression: 'model.pending_scn || model.rejected_scn'
                },
                {
                    key: 'aat_value_scn',
                    type: 'input',
                    optionsTypes: ['scn'],
                    templateOptions: {
                        label: 'Scottish Candidate Number (SCN) (if applicable)',
                        placeholder: '',
                        description: ''
                    },
                    expressionProperties: {
                        'resetULN': function(viewValue, modelValue, scope) {

                            if (modelValue && !scope.model.pending_scn && !scope.model.rejected_scn) {
                                // Remove ULN if there is a valid SCN.
                                updateUlnScnFields(scope, 'aat_value_uln');
                            }
                        },
                        'templateOptions.disabled': 'model.aat_value_uln',
                        'templateOptions.description': function(viewValue, modelValue, scope) {
                            if (scope.model.pending_scn) {
                                return scope.options.templateOptions.description === scope.model.description;
                            }
                            else if (scope.model.rejected_scn) {
                                return scope.options.templateOptions.description === scope.model.description;
                            }
                        }
                    },
                    hideExpression: 'model.pending_uln || model.rejected_uln'
                },
                {
                    key: 'exampleDirective',
                    template: '<div class="form-type-alphafield form-item-personal-details-user-first-name form-item form-group"> <div popover-placement="left" popover-append-to-body="true" popover-trigger="mouseenter" popover="If you live in Scotland, you will need to provide your SCN number.It is a nine digit number. If you do not have an SCN,  It is a nine digit number. If you do not have an SCN, Qualification Authority (SQA) at a later date. Once you have been issued an SCN, you will be notified." popover-title="Scottish Candidate Number(SCN)" class="aat-popover-generated label label-info " data-original-title="" title="">More info</div></div>',
                    hideExpression: 'model.pending_uln || model.rejected_uln'
                }
            ];
            fc.userStatusFields = [
                {
                    key: 'user_status',
                    type: 'radio',
                    templateOptions: {
                        label: 'Status',
                        options: [
                            {
                                "name": "Active",
                                "value": "true"
                            },
                            {
                                "name": "Blocked",
                                "value": "false"
                            }
                        ],
                        valueProp: 'value'
                    }
                }
            ];
            fc.userRolesFields = [
                {
                    key: 'user_roles',
                    type: 'multiCheckbox',
                    templateOptions: {
                        label: 'User roles',
                        options: fc.userRoles,
                        valueProp: 'value'
                    }
                }
            ];
            fc.centreMembershipFields = [
                {
                    key: 'centre_membership',
                    template: (fc.centreMembershipMarkup) ? fc.centreMembershipMarkup : '<p>&nbsp;</p>'
                }
            ];
        }

        /**
         * @description Personal details onSubmit function definition.
         * @return {object}
         */
        function personalDetailsOnSubmit() {

            var payload = {
                'id': fc.personalProfileData.id,
                'aat_otherdesignatoryletters': fc.personalProfileData.aat_otherdesignatoryletters
            };

            return userProfileService.postProfileData(payload, 'personalDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.submitPersonalDetails = true;
                    fc.unsavedPersonalDetails = false;
                    fc.personalDetailsForm.$setPristine();
                    return response;
                }
                // Error callback.
                //function(response) {
                //}
            );
        }


        /**
         * @description Adding new email onSubmit function definition.
         * @return {object}
         *
         */
        function newEmailOnSubmit() {

            fc.submitNewEmailFailed = false;
            fc.submitNewEmail = false;

            return userProfileService.postProfileData(fc.newEmailMemberData, 'emailDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.newEmailMemberData = {};
                    fc.submitNewEmail = true;
                    fc.unsavedEmailPasswordDetails = false;
                    fc.newEmailForm.$setPristine();
                    fc.newEmailForm.$setUntouched();
                    fc.personalProfileData.emailaddress1 = response;
                    return response;
                },
                // Error callback.
                function(response) {
                    fc.newEmailMemberData = {};
                    fc.unsavedEmailPasswordDetails = false;
                    fc.newEmailForm.$setPristine();
                    fc.newEmailForm.$setUntouched();
                    fc.submitNewEmailFailed = response;
                });
        }

        /**
         * @return {object}
         * @description adding new Password onSubmit function definition
         */
        function newPasswordOnSubmit() {

            fc.submitNewPasswordFailed = false;
            fc.submitNewPassword = false;

            return userProfileService.postProfileData(fc.newPasswordMemberData, 'passwordDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.newPasswordMemberData = {};
                    fc.submitNewPassword = true;
                    fc.unsavedEmailPasswordDetails = false;
                    fc.newPasswordForm.$setPristine();
                    fc.newPasswordForm.$setUntouched();
                    return response;
                },
                // Error callback.
                function(response) {
                    fc.unsavedEmailPasswordDetails = false;
                    fc.newPasswordForm.$setPristine();
                    fc.newPasswordForm.$setUntouched();
                    fc.submitNewPasswordFailed = response;
                    fc.newPasswordMemberData = {};
                });
        }

        /**
         * @return {object}
         * @description adding or changing the contact details onSubmit function definition
         */
        function contactDetailsOnSubmit() {

            fc.submitContactDetails = false;
            fc.submitContactDetailsFailed = false;

            // Don't update aat_otherdesignatoryletters if user didn't save changes in personal details sections.
            delete fc.personalProfileData.aat_otherdesignatoryletters;

            return userProfileService.postProfileData(fc.personalProfileData, 'contactDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.submitContactDetails = true;
                    fc.unsavedContactDetails = false;
                    fc.contactDetailsForm.$setPristine();
                    return response;
                },
                // Error callback.
                function(response) {
                    fc.submitContactDetailsFailed = true;
                    fc.unsavedContactDetails = false;
                    fc.contactDetailsForm.$setPristine();
                    return response;
                });
        }

        /**
         * @return {object}
         * @description Employment details onSubmit function definition
         */
        function employmentDetailsOnSubmit() {

            fc.employmentDetailsForm.$setPristine();

            userProfileService.postProfileData(fc.employmentDataModel, 'employmentDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.submitEmploymentDetails = true;
                    fc.unsavedEmploymentDetails = false;
                    fc.employmentDetailsForm.$setPristine();
                    // Set saved flag.
                    fc.saved[fc.employmentDataModel.id] = true;
                    fc.unsaved = {};
                    fc.employmentSectionEdited = false;

                    formatEmploymentData(response);

                    generalEmploymentUpdate();

                    fc.displayEmploymentForm = false;
                    fc.displayEmploymentOptions = false;

                    return response;
                },
                // Error callback.
                function(response) {
                    fc.submitEmploymentDetailsFailed = true;
                    fc.unsavedEmploymentDetails = false;
                    fc.employmentDetailsForm.$setPristine();
                    return response;
                });
        }

        /**
         *
         * @param model
         * @return {object}
         * @description Study section onSubmit function definition
         */
        function studyOnSubmit(model) {
            // Call service to post data.
            userProfileService.postProfileData(model, 'studyDetailsPost').then(
                // Success callback.
                function(response) {
                    fc.submitStudyDetails = true;
                    fc.unsavedStudyDetails = false;
                    fc.studyDetailsForm.$error = [];
                    fc.studyDetailsForm.$setUntouched();
                    fc.studyDetailsForm.$setPristine();
                    fc.additional_id.model = response;
                    return response;
                }
                //,
                //// Error callback.
                //function(response) {
                //
                //}
            );
        }

        /**
         *
         * @param model
         * @return {object}
         * @description User Status onSubmit function definition
         */
        function userStatusOnSubmit(model) {

            // Call service to post data.
            userProfileService.postProfileData(model, 'userStatusRolesPost').then(
                // Success callback.
                function(response) {
                    fc.submitUserStatus = true;
                    fc.unsavedUserStatus = false;
                    fc.userStatusText = (model.user_status === 'true') ? 'Active' : 'Blocked';
                    fc.userStatusForm.$error = [];
                    fc.userStatusForm.$setUntouched();
                    fc.userStatusForm.$setPristine();
                    //fc.userStatusModel = response;
                    return response;
                }
                // Error callback.
                //function(response) {
                //
                //}
            );
        }

        /**
         *
         * @param model
         * @returns {Object}
         * @description User role details onSubmit function definition
         */
        function userRolesOnSubmit(model) {

            // Call service to post data.
            userProfileService.postProfileData(model, 'userStatusRolesPost').then(
                // Success callback.
                function(response) {
                    fc.userRolesString = response;
                    fc.submitUserRoles = true;
                    fc.unsavedUserRoles = false;
                    fc.userRolesForm.$error = [];
                    fc.userRolesForm.$setUntouched();
                    fc.userRolesForm.$setPristine();
                    //fc.userRolesModel = response;
                    return response;
                }
                // Error callback.
                //function(response) {
                //
                //}
            );
        }

        /**
         *
         * @param id
         * @returns {Object}
         * @description deleting an employment function definition
         */
        function deleteEmployment(id) {

            fc.employmentRemoveConfirmation = false;

            // Call service to post data.
            userProfileService.deleteEmployment(id).then(
                // Success callback.
                function(response) {

                    fc.displayEmploymentForm = false;

                    fc.employmentDataModel = {};

                    if (id in fc.unsaved) {
                        delete fc.unsaved[id];
                    }

                    fc.employmentDetailsForm.$setPristine();

                    for (var i = 0; i < fc.employmentProfileData.length; i++) {
                        if (fc.employmentProfileData[i].id === id) {
                            fc.employmentProfileData.splice(i, 1);
                            break;
                        }
                    }

                    //delete fc.employmentProfileData[id];
                    if (fc.employmentFeatureProfile && fc.employmentFeatureProfile.id === id) {
                        delete fc.employmentFeatureProfile;
                    }

                    if (fc.employmentProfileData.length === 0) {

                        fc.addMoreEmployment = false;
                        fc.displayEmploymentOptions = true;
                        //fc.displayEmploymentForm = false;
                        fc.employmentProfileData = {};

                        delete fc.employmentProfileData;

                        if (fc.employmentFeatureProfile) {
                            delete fc.employmentFeatureProfile;
                        }

                    }

                    formatEmploymentData(response);
                    checkForEditedEmployment();
                    return response;
                },
                // Error callback.
                function(response) {
                    return response;
                });
        }

        /**
         *
         * @param profileData
         * @description  EmploymentData format function definition
         */
        function formatEmploymentData(profileData) {

            if (profileData.employment) {
                fc.employmentProfileData = profileData.employment;
                // Feature employment data.
                fc.employmentFeatureProfile = profileData.feature_employment;

                // Convert object of objects into array of objects.
                // ng-repeat by default sort items by key which we do not want.
                // We want ng-repeat to display items in the same order as returned in API response.
                var keys = Object.keys(fc.employmentProfileData);
                var sorted = [];
                for (var j=0; j < keys.length; j++) {
                    sorted[j] = fc.employmentProfileData[keys[j]];
                }

                fc.employmentProfileData = sorted;
            }

            if (fc.employmentFeatureProfile) {
                fc.addMoreEmployment = true;
                fc.displayEmploymentOptions = false;
            }
            else {
                fc.displayEmploymentOptions = true;
            }
        }

        /**
         *
         * @param array
         * @param prop
         * @param value
         * @returns {*}
         */
        function findField(array, prop, value) {
            var foundItem;
            array.some(function(item) {
                if (item[prop] === value) {
                    foundItem = item;
                }
                return !!foundItem;
            });
            return foundItem;
        }

        /**
         *
         * @param employmentRecord function defination
         */
        function clickEditEmployment(employmentRecord) {

            fc.employmentDataModel = {};

            if (employmentRecord.aat_selfemployed && (employmentRecord.aat_businesstype === '' || employmentRecord.aat_businesstype === null)) {
                employmentRecord.aat_businesstype = 'select';
            }

            var county = employmentRecord.aat_address_stateorprovince;

            if (county === null || county === '' || county === undefined) {
                employmentRecord.aat_address_stateorprovince = 'select';
            }

            fc.employmentDataModel = employmentRecord;
            fc.employmentDetailsEdit = employmentRecord.id;
            fc.editEmploymentDetails = true;
            fc.displayEmploymentSummary = false;
            fc.editAddEmploymentOption = false;
            fc.displayEmploymentOptions = false;
            fc.displayEmploymentForm = true;

            if (fc.employmentDetailsForm.$pristine) {
                validateFormFields(fc.employmentDetailsForm);
                employmentFormReset(employmentRecord.aat_organisation);
            }
        }

        /**
         *
         * @param orgName
         * @param setPristine
         */
        function employmentFormReset(orgName, setPristine) {

            setPristine = typeof setPristine !== 'undefined' ? setPristine : false;

            if (orgName) {

                var orgField = getField(fc.employmentDetailsForm, 'aat_organisation');

                // Need to add typeahead model to populate the field.
                orgField.selectOrganisation = {};

                orgField.selectOrganisation.aat_organisation = orgName;
            }

            if (setPristine || (fc.employmentDataModel && !(fc.unsaved.hasOwnProperty(fc.employmentDataModel.id)))) {
                fc.employmentDetailsForm.$valid = true;
                fc.employmentDetailsForm.$invalid = false;
                fc.employmentDetailsForm.$error = [];
                fc.employmentDetailsForm.$setPristine();
            }
        }

        /**
         * @description cancleing the confirmation alert of removing an employment
         */
        function clickCancelEditEmployment() {

            fc.employmentDetailsEdit = false;
            fc.editEmploymentDetails = false;
            fc.displayEmploymentSummary = true;
            fc.displayEmploymentForm = false;
            checkEmploymentEdited();
            fc.displayEmploymentOptions = false;
        }

        /**
         * @description cancleing the confirmation alert of adding an employment
         */
        function clickCancelAddEmployment() {

            generalEmploymentUpdate();

            // Display employment type options when user cancel adding new employment when they don't have any employment record.
            if (!fc.employmentFeatureProfile || fc.employmentFeatureProfile === undefined) {
                fc.displayEmploymentOptions = true;
            }

            fc.displayEmploymentForm = false;
            fc.employmentDetailsForm.$setPristine();

        }

        /**
         * @description checking whether the employment section is edited or not
         * @function checkEmploymentEdited @see @line 1637
         */
        function checkEmploymentEdited() {

            var isEdited = (fc.employmentDetailsForm.$valid && !fc.employmentDetailsForm.$pristine);

            if (isEdited) {
                fc.unsaved[fc.employmentDataModel.id] = true;
                fc.saved[fc.employmentDataModel.id] = false;
            }
            else {
                delete fc.unsaved[fc.employmentDataModel.id];
            }
        }

        /**
         * @description cancleing the confirmation alert of removing an employment
         * @function
         */
        function generalEmploymentUpdate() {

            checkEmploymentEdited();

            fc.displayEmploymentSummary = true;
            fc.newEmploymentDetails = false;
            fc.editEmploymentDetails = false;
            fc.employmentDataModel = {};
            fc.editEmploymentDetails = false;
            fc.employmentDetailsEdit = false;
        }

        /**
         *
         * @param id
         */
        function clickRemoveEmployment(id) {

            fc.employmentRemoveConfirmation = id;
            fc.employmentDetails = true;
        }

        /**
         * @description clicking function on the add more employment
         */
        function clickAddEmployment() {

            fc.addEmployment = !fc.addEmployment;
            fc.employmentDataModel = {};
            fc.employmentBtn = true;
            fc.newEmploymentDetails = true;
            fc.displayEmploymentOptions = true;
            fc.displayEmploymentForm = false;
        }

        /**
         *
         */
        function clickAddMoreEmployment() {



            fc.addMoreEmployment = !fc.addMoreEmployment;
            fc.employmentBtn = true;
            fc.newEmploymentDetails = true;

            fc.displayEmploymentSummary = false;
            fc.displayEmploymentOptions = true;

            employmentFormReset(false, true);
            //fc.displayEmploymentForm = true;
        }

        /**
         * @description Unsaved flag fired on closing the PersonalDetails panel
         */
        function closePersonalDetails() {
            fc.unsavedPersonalDetails = (fc.personalDetailsForm.$valid && !fc.personalDetailsForm.$pristine);
        }

        /**
         * @description Unsaved flag fired on closing the study panel
         */
        function closeStudyDetails() {
            fc.unsavedStudyDetails = fc.studyDetailsForm.$valid && !fc.studyDetailsForm.$pristine;
        }

        /**
         * @description Unsaved flag fired on closing the UserStatus panel
         */
        function closeUserStatus() {
            fc.unsavedUserStatus = fc.userStatusForm.$valid && !fc.userStatusForm.$pristine;
        }

        /**
         * @description Unsaved flag fired on closing the User Roles panel
         */
        function closeUserRoles() {
            fc.unsavedUserRoles = fc.userRolesForm.$valid && !fc.userRolesForm.$pristine;
        }

        /**
         * @description Unsaved flag fired on closing the contact details panel
         */
        function closeContactDetails() {
            fc.unsavedContactDetails = fc.contactDetailsForm.$valid && !fc.contactDetailsForm.$pristine;
        }

        /**
         * @description Unsaved flag fired on closing the email and password panel
         */
        function closeEmailAndPasswordDetails() {

            fc.unsavedEmailPasswordDetails = fc.newEmailForm.$valid && !fc.newEmailForm.$pristine || fc.newPasswordForm.$valid && !fc.newPasswordForm.$pristine;
        }

        /**
         * @description Unsaved flag fired on closing the employment panel
         * @function checkForEditedEmployment @see @line 1772
         */
        function closeEmploymentDetails() {

            checkForEditedEmployment();

        }

        /**
         *
         * @param op
         */
        function clickEmploymentOption(op) {

            fc.displayEmploymentOptions = false;

            fc.employmentDataModel = {};

            if (!fc.addMoreEmployment) {
                fc.newEmploymentDetails = true;
            }

            fc.employmentDataModel.aat_selfemployed = op;
            // @todo is there any better way of setting a default value in formly select? defaultVale property does not seem to work.
            fc.employmentDataModel.aat_address_country = 'GBR';
            fc.employmentDataModel.aat_address_stateorprovince = 'select';
            fc.displayEmploymentForm = true;

            if (fc.employmentDataModel.aat_selfemployed === true) {
                fc.employmentDataModel.aat_businesstype = 'select';
            }

            resetFormFields(fc.employmentDetailsForm);
        }

        /**
         *
         * @returns {boolean}
         */
        function checkForEditedEmployment() {

            fc.employmentSectionEdited = (Object.keys(fc.unsaved).length);

        }

        /**
         *
         * @param form
         * @param fieldToCheck
         * @returns {boolean}
         */
        function isFieldValid(form, fieldToCheck) {

            for (var field in form) {

                if (form.hasOwnProperty(field)) {

                    if (field.substring(0, 8) === form.$name && field.indexOf(fieldToCheck) > -1 && form[field].$valid === true) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         *
         * @param form
         * @param fieldToCheck
         * @returns {boolean}
         */
        function getFieldValue(form, fieldToCheck) {

            for (var field in form) {

                if (form.hasOwnProperty(field)) {

                    if (field.substring(0, 8) === form.$name && field.indexOf(fieldToCheck) > -1) {
                        return form[field].$viewValue;
                    }
                }
            }
            return false;
        }

        /**
         *
         * @param form
         * @param fieldToCheck
         * @returns {boolean}
         */
        function getField(form, fieldToCheck) {

            for (var field in form) {

                if (form.hasOwnProperty(field)) {

                    if (field.indexOf(fieldToCheck) > -1) {
                        return form[field];
                    }
                }
            }
            return false;
        }

        /**
         *
         * @param form
         * @returns {*}
         */
        function resetFormFields(form) {

            for (var field in form) {

                if (form.hasOwnProperty(field)) {

                    if (field.indexOf(form.$name) > -1) {
                        form[field].$error = [];
                        form[field].$invalid = false;
                        form[field].$valid = true;
                        form[field].$setPristine();
                        form[field].$setUntouched();

                        if (form[field].hasOwnProperty('selectOrganisation')) {
                            delete form[field].selectOrganisation;
                        }
                    }
                }
            }
            return false;
        }

        /**
         *
         */
        function clickEditContactDetails() {

            if (fc.personalProfileData.address1_stateorprovince === '' || fc.personalProfileData.address1_stateorprovince === null) {
                fc.personalProfileData.address1_stateorprovince = 'select';
            }

            validateFormFields(fc.contactDetailsForm);
        }

        /**
         *
         * @param form
         */
        function validateFormFields(form) {

            for (var field in form) {

                if (form.hasOwnProperty(field)) {

                    if (field.substring(0, 8) === form.$name) {

                        if ((field.indexOf('aat_organisation') === -1) || (field.indexOf('aat_organisation') > -1 && form[field].$viewValue === '')) {
                            // If field is empty and not required then ignore all other attached validations.
                            if ((form[field].$viewValue === null || form[field].$viewValue === '')  && !form[field].$error.required) {
                                form[field].$setViewValue('');
                            }
                            else {
                                form[field].$setTouched();
                            }
                        }
                    }
                }
            }
        }

        /**
         *
         * @param scope
         * @param field_name
         */
        function updateUlnScnFields(scope, field_name) {

            var field = findField(scope.fields, 'key', field_name);

            field.formControl.$setViewValue('');
            field.formControl.$render();
            field.formControl.$error = [];
            field.formControl.$setPristine();
            field.formControl.$setUntouched();
            scope.form.$valid = true;
            scope.form.$invalid = false;

        }

        /**
         * @description redirecting the link
         */
        function redirectToRegService() {
            window.open('/register/student', '_blank');
        }

        /**
         * @description redirecting the link
         */
        function redirectToCentreMembershipEdit() {
            window.open('/admin/aat/entity/centre_membership/edit/' + fc.personalProfileData.uid, '_blank');
        }


    }

    angular
        .module('aat_user_profile')
        .controller('FormsCtrl',  FormsCtrl);
    FormsCtrl.$inject = ['$scope', '$timeout', '$routeParams', 'formlyVersion', 'is', 'formlyExampleApiCheck', 'userProfileService', 'organisationService', 'postCodeService', 'emailAddressValidationService', 'TITLE_SALUTATIONS'];
}());