/**
 * Created by dbreuer83 on 13/11/15.
 */
'use strict';

var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');
var fs = require("fs");
var testHelper = require("./src/helper.js");

var PluginError = gutil.PluginError;
// Consts
var PLUGIN_NAME = 'gulp-create-test-files';

function gulpTests() {}

gulpTests.prototype.init = function (opts) {

    var testObject = {};

    if (typeof opts === undefined) {
        opts = {};
    }
    opts = {
        src: __dirname + 'app/',
        dist: __dirname + '/tests',
        temp: 'templates/',
        testFileSuffix: '.spec.js',
        projectPrefix: 'project'
    };
    return through.obj(function (file, enc, cb) {

        //options.testFileSuffix = new Buffer(options.testFileSuffix);

        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {

            if (!testHelper.isAngular(file)) {
                console.log('Skipped:', 'not angular file', "File not created");
                return cb();
            }

            if (testHelper.hasTest(file)) {
                console.log('Skipped:', 'has test file', "File not created");
                return cb();
            }

            console.log(file.path);

            // Comments match regexp
            // patternForComments= /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
            /**
             * module type regex
             * @type {RegExp}
             */

            var match = testHelper.getAllProviders(file.contents);
            var matchFunctions = testHelper.getAllFunctions(file.contents);
            var matchServices;

            var opt = {
                date: new Date(),
                type: null,
                typeName: null,
                module: opts.projectPrefix + '.' + testHelper.truncateJsSuffix(_(file.path.split('/')).last()),
                dependency: null,
                directiveName: null,
                path: file.path,
                filename: _(file.path.split('/')).last(),
                amdPath: 'namm',
                name: testHelper.truncateJsSuffix(_(file.path.split('/')).last()),
                capitalizedName: testHelper.capitalize(testHelper.truncateJsSuffix(_(file.path.split('/')).last()))
            };
            console.log(match[0]);
            if (match) {
                opt.type = match[1];
                opt.typeName = match[2];
                matchServices = testHelper.getAllServices();
            }

            if (opt.type === 'directive') {
                opt.directiveName = testHelper.dasherize(opt.typeName);
            }

            if (matchFunctions !== null) {
                opt.funcObj = matchFunctions;
            }

            if (opt.type === 'service' || 'factory') {
                opt.services = matchServices;
            }

            opt.caches = testHelper.getAllCache(file.contents);
            /**
             *
             * @type {{functions: *}}
             */
            testObject = {
                module: testHelper.getAllModules(file.contents),
                dependency: testHelper.getAllModuleDependency(file.contents),
                providers: testHelper.getAllProviders(file.contents),
                functions: testHelper.getAllFunctions(file.contents),
                cache: testHelper.getAllCache(file.contents),
                services: testHelper.getAllServices(file.contents)
            };

            fs.writeFile('message.json', JSON.stringify(testObject), 'utf8', function (response) {
                console.log("Test file: ", response);
            });
            var templateFile = opt.type === void 0 ? 'angular.' + opt.type + '.temp' : 'angular.module.temp';
            var fileContent = String(fs.readFileSync(__dirname + "/templates/" + templateFile, "utf8"));

            var compiled = _.template(fileContent);

            file.contents = new Buffer(compiled(opt));

            file.path = testHelper.replaceExtension(file.path, '.spec.js'); // file.js
            console.log('Created test files: ', _(file.path.split('/')).last());
        }

        cb(null, file);
        //cb(null);
    });
};

module.exports = new gulpTests();

//# sourceMappingURL=index-compiled.js.map