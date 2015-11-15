/**
 * Created by dbreuer83 on 13/11/15.
 */
var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');
var fs = require("fs");


var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-create-test-files';

function truncateJsSuffix(name) {
    return name.replace(/.js$/i, '');
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function dasherize( string ) {
    return string. replace ( /([^])([A-Z]+)([^$])/g, '$1-$2$3' ). toLowerCase();
}

function gulpTests(options) {
    gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));

    var opts = (options)?options:{};
    if (!options) {
        opts = {
            'src': options.src || './src/',
            'dist': options.dist || './dist/',
            'temp': options.temp || 'templates/',
            'testFileSuffix': options.testFileSuffix || '.spec.js',
            'projectPrefix': options.projectPrefix || 'project'
        };
    }
    console.log();

    if (!options) {
        throw new PluginError(PLUGIN_NAME, 'Missing options object!');
    }
    if (!options.testFileSuffix) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }


        // Creating a stream through which each file will pass
        return through.obj(function(file, enc, cb) {

            //options.testFileSuffix = new Buffer(options.testFileSuffix);


            if (file.isNull()) {
                return cb(null, file);
            }
            if (file.isStream()) {
                this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
                return cb();
            }
            if (file.isBuffer()) {

                if (fs.existsSync(file.path.replace('.js', '.spec.js'))) {
                    gutil.log('Skipped:', 'spec file exists ', gutil.colors.green("File not created"));
                    return cb();
                }

                if(file.path.indexOf('min.js') > -1) {
                    gutil.log('Skipped:','minified' , gutil.colors.green("File not created"));
                    return cb();
                }

                if(file.path.indexOf('test.js') > -1) {
                    gutil.log('Skipped:','test file' , gutil.colors.green("File not created"));
                    return cb();
                }

                if(file.path.indexOf('build.js') > -1) {
                    gutil.log('Skipped:','Build file' , gutil.colors.green("File not created"));
                    return cb();
                }

                if(file.path.indexOf('bower_components') > -1) {
                    gutil.log('Skipped:','bower file' , gutil.colors.green("File not created"));
                    return cb();
                }

                gutil.log(gutil.colors.green(file.path));


                // Comments match regexp
                // patternForComments= /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                /**
                 * module type regex
                 * @type {RegExp}
                 */

                var typeTestCtrl = /\.(controller|service|factory|config|run|directive)[\(\']'(.*)'/g;
                var typeTestModule = /\.(module)[\(\']'(.*)'/g;
                var typeModuleDependency = /(\[[\s\S]*?\])\)/g;
                var match = typeTestCtrl.exec(String(file.contents));
                var modulematch = typeTestModule.exec(String(file.contents));
                var dep = typeModuleDependency.exec(String(file.contents));



                var opt = {
                    date: new Date(),
                    type: null,
                    typeName: null,
                    module: options.projectPrefix + '.' + truncateJsSuffix(_(file.path.split('/')).last()),
                    dependency: null,
                    directiveName: null,
                    path: file.path,
                    filename: _(file.path.split('/')).last(),
                    amdPath: 'namm',
                    name: truncateJsSuffix(_(file.path.split('/')).last()),
                    capitalizedName: capitalize(truncateJsSuffix(_(file.path.split('/')).last()))
                };
                if (match) {
                    opt.type = match[1];
                    opt.typeName = match[2];
                }
                if (dep) {
                    dep = dep[1].replace("[", "");
                    dep = dep.replace("]", "");
                    dep = dep.split(',');
                    opt.dependency = dep;
                }
                if (opt.type === null && modulematch) {
                    opt.module = modulematch[2]
                }
                if (opt.type === 'directive') {
                    opt.directiveName = dasherize(opt.typeName);
                }

                var templateFile = (opt.type!==null)?'angular.'+opt.type+'.temp':'angular.module.temp';
                var fileContent=String(fs.readFileSync(__dirname+"/templates/"+templateFile, "utf8"));

                var compiled = _.template(fileContent);
                console.log()
                file.contents = new Buffer(compiled(opt));

                file.path = gutil.replaceExtension(file.path, '.spec.js'); // file.js
                gutil.log('Created test files: ', gutil.colors.green(_(file.path.split('/')).last()));
            }

            cb(null, file);

        });
}

module.exports = gulpTests;