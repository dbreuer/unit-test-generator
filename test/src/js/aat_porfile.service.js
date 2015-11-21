/**
 * Created by atharkhan on 29/09/15.
 */
(function() {

    'use strict';

    var cacheID = 'profileServiceCache';
    var endpoint = {};
    var isAdmin = false;

    var Drupal = {"settings":{"themeName":"bootstrap_aat","basePath":"/","pathPrefix":"","ajaxPageState":{"theme":"bootstrap_aat","theme_token":"aUSXgD1TSch5nKQfAVdquNkcQLZnwaN8u2aQCbch0HQ","js":{"0":1,"1":1,"2":1,"sites/all/modules/contrib/picture/picturefill2/picturefill.min.js":1,"sites/all/modules/contrib/picture/picture.min.js":1,"sites/all/themes/bootstrap/js/bootstrap.js":1,"sites/all/libraries/modernizr/modernizr-latest.js":1,"sites/all/modules/custom/aat_jquery_update/replace/jquery/1.10/jquery.min.js":1,"sites/all/libraries/jquery.jstree/jstree.js":1,"https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js":1,"misc/jquery.once.js":1,"misc/drupal.js":1,"sites/all/modules/custom/aat_jquery_update/replace/ui/external/jquery.cookie.js":1,"sites/all/modules/custom/aat_google/aat_dfp/js/aat_dfp.js":1,"sites/all/libraries/colorbox/jquery.colorbox-min.js":1,"sites/all/modules/contrib/colorbox/js/colorbox.js":1,"sites/all/modules/contrib/colorbox/styles/default/colorbox_style.js":1,"sites/all/modules/contrib/colorbox/js/colorbox_inline.js":1,"sites/all/modules/contrib/memcache/memcache_admin/memcache.js":1,"sites/all/themes/bootstrap_aat/js/aat.js":1,"sites/all/themes/bootstrap_aat/bower_components/api-check/dist/api-check.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular/angular.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-messages/angular-messages.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-route/angular-route.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-cache/dist/angular-cache.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-formly/dist/formly.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-formly-templates-lumx/dist/formlyLumx.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-animate/angular-animate.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-aria/angular-aria.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/lumx/dist/lumx.js":1,"sites/all/themes/bootstrap_aat/bower_components/is_js/is.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-bootstrap/ui-bootstrap.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js":1,"sites/all/themes/bootstrap_aat/bower_components/loader/classie.js":1,"sites/all/themes/bootstrap_aat/bower_components/modernizr/modernizr.js":1,"sites/all/themes/bootstrap_aat/bower_components/loader/pathLoader.js":1,"sites/all/modules/custom/aat_user/aat_user_profile/js/aat_user_profile.app.js":1,"sites/all/modules/custom/aat_user/aat_user_profile/js/aat_user_profile.config.js":1,"sites/all/modules/custom/aat_user/aat_user_profile/js/aat_user_profile.service.js":1,"sites/all/modules/custom/aat_user/aat_user_profile/js/aat_user_profile.controller.js":1,"sites/all/modules/custom/aat_pcanywhere/postcodeanywhere.js":1,"sites/all/themes/bootstrap_aat/js/autocomplete.js":1,"sites/all/themes/bootstrap_aat/js/usernotice.js":1,"sites/all/themes/bootstrap_aat/js/vendor/equalheights.js":1,"sites/all/themes/bootstrap_aat/../../libraries/jquery.scrolltofixed/jquery-scrolltofixed.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/tooltip.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/affix.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/alert.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/button.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/carousel.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/collapse.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/dropdown.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/modal.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/popover.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/scrollspy.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/tab.js":1,"sites/all/themes/bootstrap_aat/js/bootstrap/transition.js":1},"css":{"modules/system/system.base.css":1,"sites/all/modules/custom/aat_social/css/aat_social.css":1,"sites/all/modules/contrib/date/date_api/date.css":1,"sites/all/modules/contrib/date/date_repeat_field/date_repeat_field.css":1,"modules/field/theme/field.css":1,"sites/all/modules/contrib/flexslider/assets/css/flexslider_img.css":1,"sites/all/modules/contrib/picture/picture_wysiwyg.css":1,"sites/all/modules/contrib/views/css/views.css":1,"sites/all/modules/custom/aat_user/aat_user_custom_dashboards/css/bootstrap-tour.min.css":1,"sites/all/modules/contrib/ckeditor/css/ckeditor.css":1,"sites/all/modules/custom/aat_mip_directory/css/aat_mip_directory.css":1,"sites/all/modules/custom/aat_skills_test/css/aat_skills_test.css":1,"sites/all/modules/custom/aat_tag_filter/css/aat_tag_filter.css":1,"sites/all/modules/custom/aat_user/aat_user_perspective/css/aat_user_perspective.css":1,"sites/all/modules/contrib/colorbox/styles/default/colorbox_style.css":1,"sites/all/modules/contrib/ctools/css/ctools.css":1,"sites/all/modules/contrib/panels/css/panels.css":1,"sites/all/modules/custom/aat_user/aat_user_profile/css/loader.css":1,"sites/all/modules/custom/aat_user/aat_user_profile/css/aat_user_profile.css":1,"sites/all/modules/contrib/panels/plugins/layouts/onecol/onecol.css":1,"sites/all/themes/bootstrap_aat/css/fonts.css":1,"/sites/all/themes/bootstrap_aat/css/main.css":1,"/sites/all/themes/bootstrap_aat/css/fonts.css":1}},"colorbox":{"opacity":"0.85","current":"{current} of {total}","previous":"« Prev","next":"Next »","close":"Close","maxWidth":"98%","maxHeight":"98%","fixed":true,"mobiledetect":true,"mobiledevicewidth":"480px"},"aat_user_profile":{"uid":"1974681","endpoint":{"user_service":"api/user/profile/get/1974681","country_service":"api/country/list","mip_services":"api/user/mip-services/get/1974681","prog_reg_service":"api/programme-registration/active/get/1974681","organisation_service":"organisation/finder/profile","email_verify":"api/user/email/verify","personal_details_post":"api/user/profile/personal-details/post/1974681","employment_details_post":"api/user/profile/employment/post/1974681","contact_details_post":"api/user/profile/contact-details/post/1974681","email_details_post":"api/user/profile/email/post/1974681","password_details_post":"api/user/profile/password/post/1974681","additional_id_post":"api/user/profile/additional-id/post/1974681","employment_delete":"api/user/employment/delete/1974681"}},"postcodeanywhere":{"account_code":"","licence":"EE16-EK91-TR38-BR92","id_wrapper":".form-item-aat-profile-field-profile-postcode, .form-item-field-profile-postcode, .postcodeanywhere, .postcode, .form-item-field-centre-postcode-und-0-value","id_postcode":"input[id*='-postcode']","id_lookup_button":"#postcodeanywhere-lookup-button","id_company":"input[id*='-company']","id_company_wrapper":"div.form-item-address-company","id_line1":"input[id*='address-1']","id_line1_wrapper":"","id_line2":"input[id*='address-2']","id_line2_wrapper":"","id_line3":"input[id*='address-3']","id_line3_wrapper":"","id_town":"input[id*='-town'], input[id*='edit-pca-city']","id_town_wrapper":"","id_county":"select[id*='-county']","id_county_wrapper":"","id_country":"select[id*='-country']","id_country_uk_value":"GBR","submit_label_value":"Find address","showAlert":1,"message_postcode_invalid":"Supply a valid UK Postcode","message_postcode_no_match":"Sorry, no matching addresses found. Please check the Postcode","url":"http://services.postcodeanywhere.co.uk/inline.aspx"},"aat_social_hub":{"hubs":{"facebook":{"name":"Facebook","custom_title":"AAT on Facebook","api_key":"","token":"","token_secret":"","client_id":"","client_secret":"be0d731ba327624d7c176e0ad50b83aa","extra":{"page":"youraat","appID":"375144072667872","app_secret":"c33f08bc6dcacfdaa121953628f65caf","userid":"100004549324082","maxResults":"5"}},"aat_comment":{"name":"AAT Comment","custom_title":"AAT Comment","api_key":"","token":"","token_secret":"","client_id":"","client_secret":"","extra":{"maxResult":"3"}},"storify":{"name":"Storify","custom_title":"Why become a MAAT?","api_key":"54eeebead3a5afae77f4b70b ","token":"","token_secret":"","client_id":"","client_secret":"","extra":{"user":"YourAAT","story_slug":"aat-maat-professional-full-membership-benefits"}},"instagram":{"name":"Instagram","custom_title":"Study snacks","api_key":"","token":"","token_secret":"","client_id":"2c96574c7cf34404a2e89ae145995b90","client_secret":"3b5a87cff29442e0a87770f085500e1b","extra":{"media1":"2dR7_eIijx","media2":"1p12oct4ar","media3":"1tkTDumubH"}},"youtube":{"name":"YouTube","custom_title":"Community videos","api_key":"AIzaSyCWAV4raYPAMrflhqqVttEjY4FOCX-AE_A","token":"","token_secret":"","client_id":"","client_secret":"","extra":{"q":"yourbigfutureaat","maxResults":"3","part":"id, snippet","type":"video","media1":"jKkGTgNkPrs","media2":"xy6Ny-QPN1Y","media3":"KCLgjUA6GgE"}},"aat_forum":{"name":"AAT Forum","custom_title":"AAT Forums","api_key":"","token":"4637f5292c725363b53fb1aec1641c13asd","token_secret":"","client_id":"","client_secret":"","extra":{"maxResults":"5"}},"twitter":{"name":"Twitter","custom_title":"","api_key":"","token":"55209444-cUMeKmXJDhAivPW42g9rLIvAZwEOcIUGqnExPpYDi","token_secret":"AanV3JebTapaOz6Y6V1USAd6y0txoVdN8BaQe00fBO3SU","client_id":"pRlzQhXZpRhHSVH7K7ufizEtz","client_secret":"akL1K1edvzUnbhaloEGzV5vXQR4wSqIZEvwR5Ictue0t2NXca9","extra":{"hash":"youraat","accounts":"{\"youraat\":{\"user\":\"youraat\",\"title\":\"YourAAT\",\"id\":\"youraattweet\"},\"studyaat\":{\"title\":\"StudyAAT\",\"user\":\"StudyAAT\",\"id\":\"studyaattweet\"}}"}}}},"aat_social_hub_path":"sites/all/modules/custom/aat_social","urlIsAjaxTrusted":{"/user/profile":true},"bootstrap":{"anchorsFix":0,"anchorsSmoothScrolling":1,"popoverEnabled":0,"popoverOptions":{"animation":1,"html":0,"placement":"right","selector":"","trigger":"click","title":"","content":"","delay":0,"container":"body"},"tooltipEnabled":0,"tooltipOptions":{"animation":1,"html":0,"placement":"auto left","selector":"","trigger":"hover focus","delay":0,"container":"body"}}},"behaviors":{"aat_dfp":{},"initColorbox":{},"initColorboxDefaultStyle":{},"initColorboxInline":{},"bootstrap_aat":{},"aatUserProfileJs":{},"postCodeAnywhere":{},"usernotices_module":{},"picture":{},"bootstrap":{},"bootstrapPopovers":{},"bootstrapTooltips":{},"bootstrapAnchors":{}},"locale":{}};
    endpoint = {
        'get': {
            userDataService: '/' + Drupal.settings.aat_user_profile.endpoint.user_service,
            countryDataService: '/' + Drupal.settings.aat_user_profile.endpoint.country_service,
            progRegDataService: '/' + Drupal.settings.aat_user_profile.endpoint.prog_reg_service,
            mipDataService: '/' + Drupal.settings.aat_user_profile.endpoint.mip_services,
            organisationDataService: '/' + Drupal.settings.aat_user_profile.endpoint.organisation_service,
            emailVerifyService: '/' + Drupal.settings.aat_user_profile.endpoint.email_verify
        },
        'post': {
            personalDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.personal_details_post,
            employmentDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.employment_details_post,
            contactDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.contact_details_post,
            emailDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.email_details_post,
            passwordDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.password_details_post,
            studyDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.additional_id_post
        },
        'delete': {
            employmentDelete: '/' + Drupal.settings.aat_user_profile.endpoint.employment_delete
        }
    };

    //Drupal.behaviors.aatUserProfileJs = {
    //  attach: function (context, settings) {
    //    cacheID += Drupal.settings.aat_user_profile.uid;
    //
    //    endpoint = {
    //      'get': {
    //        userDataService: '/' + Drupal.settings.aat_user_profile.endpoint.user_service,
    //        countryDataService: '/' + Drupal.settings.aat_user_profile.endpoint.country_service,
    //        progRegDataService: '/' + Drupal.settings.aat_user_profile.endpoint.prog_reg_service,
    //        mipDataService: '/' + Drupal.settings.aat_user_profile.endpoint.mip_services,
    //        organisationDataService: '/' + Drupal.settings.aat_user_profile.endpoint.organisation_service,
    //        emailVerifyService: '/' + Drupal.settings.aat_user_profile.endpoint.email_verify
    //      },
    //      'post': {
    //        personalDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.personal_details_post,
    //        employmentDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.employment_details_post,
    //        contactDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.contact_details_post,
    //        emailDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.email_details_post,
    //        passwordDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.password_details_post,
    //        studyDetailsPost: '/' + Drupal.settings.aat_user_profile.endpoint.additional_id_post
    //      },
    //      'delete': {
    //        employmentDelete: '/' + Drupal.settings.aat_user_profile.endpoint.employment_delete
    //      }
    //    };
    //
    //    // If user is admin, then they should be able to view user status and user roles.
    //    if (Drupal.settings.aat_user_profile.endpoint.hasOwnProperty('user_status_roles')) {
    //      endpoint.post.userStatusRolesPost = '/' + Drupal.settings.aat_user_profile.endpoint.user_status_roles;
    //      isAdmin = true;
    //    }
    //  }
    //
    //};



    /**
     *
     * @param $q
     * @param $http
     * @param CacheFactory
     */
    function userProfileService($q, $http, CacheFactory) {

        // Do not cache for admin.
        CacheFactory('profileCache', {
            maxAge: (isAdmin) ? 0 : 60 * 60 * 1000, // Items added to this cache expire after an hour
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
            storageMode: 'localStorage' // This cache will use `localStorage`.
        });

        CacheFactory('mipServicesCache', {
            maxAge: (isAdmin) ? 0 : 60 * 60 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
            storageMode: 'localStorage' // This cache will use `localStorage`.
        });

        this.getProfileServiceData = getProfileServiceData;
        this.postProfileData = postProfileData;
        this.deleteEmployment = deleteEmployment;

        /**
         *
         * @returns {object}
         */
        function getProfileServiceData() {

            var deferred = $q.defer();
            var profileServiceCache = CacheFactory.get('profileCache');

            if (profileServiceCache.get(cacheID)) {
                deferred.resolve(profileServiceCache.get(cacheID));

            } else {

                var getUserProfilePromise = getUserProfileData();
                var getCountryListPromise = getCountryListData();
                var getProgRegPromise = getProgRegData();
                var getMipServicePromise = getMipServicesData();


                $q.all([getUserProfilePromise, getCountryListPromise, getProgRegPromise, getMipServicePromise])
                    .then(function(profileServiceData) {
                        var profileData = {
                            profileData: profileServiceData[0],
                            countryList: profileServiceData[1],
                            progRegData: profileServiceData[2],
                            mipServiceData: profileServiceData[3]
                        };

                        profileServiceCache.put(cacheID, profileData);
                        deferred.resolve(profileData);

                    }, function(response) {
                        deferred.reject(response);
                    });

            }
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        function getCountryListData() {

            return $http.get(endpoint.get.countryDataService).then(sendSuccess, sendError);
        }

        /**
         *
         * @returns {*}
         */
        function getUserProfileData() {

            return $http.get(endpoint.get.userDataService).then(sendSuccess, sendError);

        }

        /**
         *
         * @returns {*}
         */
        function getProgRegData() {

            return $http.get(endpoint.get.progRegDataService).then(sendSuccess, sendError);
        }

        /**
         *
         * @funtion
         * @promise
         * @returns {object}
         */
        function getMipServicesData() {

            var deferred = $q.defer();

            var mipServicesCache = CacheFactory.get('mipServicesCache');

            var mipCacheId = 'mipServicesCache' + Drupal.settings.aat_user_profile.uid;

            if (mipServicesCache.get(mipCacheId)) {
                deferred.resolve(mipServicesCache.get(mipCacheId));
            }
            else {
                $http.get(endpoint.get.mipDataService).then(
                    function(response) {
                        mipServicesCache.put(mipCacheId, response.data);
                        deferred.resolve(response.data);
                    },
                    function(response) {
                        deferred.reject(response.status + ': ' + response.statusText);
                    });
            }
            return deferred.promise;
        }

        /**
         *
         * @param payload
         * @returns {object}
         */
        function deleteEmployment(id) {

            var deferred = $q.defer();

            $http.delete(endpoint.delete.employmentDelete + '?id=' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                    CacheFactory.get('profileCache').remove(cacheID);
                },
                function(response) {
                    deferred.reject(response.status + ': ' + response.statusText);
                }
            );
            return deferred.promise;
        }

        /**
         *
         * @param response
         * @returns {object}
         */
        function sendSuccess(response) {
            return response.data;
        }

        /**
         *
         * @param response
         * @returns {string}
         */
        function sendError(response) {
            return response.status + ': ' + response.statusText;
        }

        /**
         *
         * @param payload
         * @param profileType
         * @returns {object}
         */
        function postProfileData(payload, profileType) {

            var deferred = $q.defer();

            $http.post(endpoint.post[profileType], payload)

                .then(
                // Success callback.
                function(response) {
                    deferred.resolve(response.data);
                    CacheFactory.get('profileCache').remove(cacheID);
                },
                // Error callback.
                function(response) {
                    deferred.reject(response.statusText);
                }
            );
            return deferred.promise;
        }

    }

    /**
     *
     * @param $q
     * @param $http
     * @param CacheFactory
     * @returns {*}
     */
    function organisationService($q, $http, CacheFactory) {

        this.getOrganisationData = getOrganisationData;

        function getOrganisationData(searchString) {

            return $http.get(endpoint.get.organisationDataService + '/' + searchString).then(sendSuccess, sendError);

        }

    }

    /**
     * @see controller.js line:13
     * @param $q
     * @param $http
     * @returns {*}
     */
    function emailAddressValidationService($q, $http) {

        this.validateEmailAddress = validateEmailAddress;

        function validateEmailAddress(emailAddress) {

            return $http.get(endpoint.get.emailVerifyService + '/' + emailAddress).success(sendSuccess).error(sendError);

        }

    }

    /**
     *
     * @param $q
     * @param $http
     * @param CacheFactory
     * @returns {*}
     */
    function postCodeService($q, $http, CacheFactory) {

        this.getPostCodeData = getPostCodeData;
        this.getAddressDetails = getAddressDetails;

        function getPostCodeData(postCode) {

            return $http.get('/postcodeanywhere/findbypostcode/' + postCode).then(sendSuccess, sendError);

        }

        function getAddressDetails(id) {
            return $http.get('/postcodeanywhere/retrievebyid/' + id).then(sendSuccess, sendError);
        }

    }

    /**
     *
     * @param response
     * @returns {object}
     */
    function sendSuccess(response) {
        return response.data;
    }

    /**
     *
     * @param response
     * @returns {string}
     */
    function sendError(response) {
        return response.status + ': ' + response.statusText;
    }

    angular
        .module('aat_user_profile')
        .service('userProfileService', ['$q', '$http', 'CacheFactory', userProfileService])
        .service('organisationService', ['$q', '$http', 'CacheFactory', organisationService])
        .service('postCodeService', ['$q', '$http', 'CacheFactory', postCodeService])
        .service('emailAddressValidationService', ['$q', '$http', 'CacheFactory', emailAddressValidationService]);
}());