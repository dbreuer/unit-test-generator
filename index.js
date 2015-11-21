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



gulpTests.prototype.init = function(opts) {

    gutil.log(gutil.colors.green('Test generator:'), gutil.colors.blue('Init'));

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
                    gutil.log('Skipped:', 'not angular file', gutil.colors.red("File not created"));
                    return cb();
                }

                if (testHelper.hasTest(file)) {
                    gutil.log('Skipped:', 'has test file', gutil.colors.red("File not created"));
                    return cb();
                }

                gutil.log(gutil.colors.green(file.path));



                // Comments match regexp
                // patternForComments= /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                /**
                 * module type regex
                 * @type {RegExp}
                 */

                var typeTestCtrl = /\.(controller|service|factory|config|run|directive|config)[\(\']'(\w*)'/g;
                var typeTestModule = /\.(module)[\(\']'(.*)'/g;
                var typeModuleDependency = /module\(\'\w+\'\,\s+(\[[\s\S]*?\])\)/g;
                var match = typeTestCtrl.exec(String(file.contents));
                var modulematch = typeTestModule.exec(String(file.contents));
                var dep = typeModuleDependency.exec(String(file.contents));

                var matchFunctions = testHelper.getAllFunctions(String(file.contents));
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
                if (match) {
                    opt.type = match[1];
                    opt.typeName = match[2];
                    matchServices = testHelper.getAllServices(String(file.contents));
                }
                if (dep && modulematch[1]) {

                    opt.dependency = eval(dep[1]);
                }
                if (opt.type === null && modulematch) {
                    opt.module = modulematch[2];
                }
                if (opt.type === 'directive') {
                    opt.directiveName = testHelper.dasherize(opt.typeName);
                }

                if (matchFunctions !== null) {
                    opt.funcObj = matchFunctions;
                }

                if (opt.type === 'service'||'factory') {
                    opt.services = matchServices;
                }

                opt.caches = testHelper.getAllCache(String(file.contents));

                console.log(testHelper.getAllConfig(String(file.contents)));

                var templateFile = (opt.type !== null) ? 'angular.' + opt.type + '.temp' : 'angular.module.temp';
                var fileContent = String(fs.readFileSync(__dirname + "/templates/" + templateFile, "utf8"));

                var compiled = _.template(fileContent);

                file.contents = new Buffer(compiled(opt));

                file.path = gutil.replaceExtension(file.path, '.spec.js'); // file.js
                gutil.log('Created test files: ', gutil.colors.green(_(file.path.split('/')).last()));
            }


                cb(null, file);
                //cb(null);




        });





};



module.exports = new gulpTests();
