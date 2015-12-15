/**
 * Created by dbreuer83 on 13/11/15.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _gulpUtil = require("gulp-util");

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _through = require("through2");

var _through2 = _interopRequireDefault(_through);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _helper = require("./src/helper.js");

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Consts
var PLUGIN_ERROR = _gulpUtil2.default.PluginError;

var PLUGIN_NAME = 'episto';

var EPISTO = (function () {
    function EPISTO(options, files) {
        _classCallCheck(this, EPISTO);

        this.options = options;
        this.files = files;
    }

    _createClass(EPISTO, [{
        key: "init",
        value: function init() {
            var testObject = {};

            var walk = function walk(dir, regExcludes, done) {
                var results = [];

                _fs2.default.readdir(dir, function (err, list) {
                    if (err) return done(err);

                    var pending = list.length;
                    if (!pending) return done(null, results);

                    list.forEach(function (file) {
                        file = path.join(dir, file);

                        var excluded = false;
                        var len = regExcludes.length;
                        var i = 0;

                        for (; i < len; i++) {
                            if (file.match(regExcludes[i])) {
                                excluded = true;
                            }
                        }

                        // Add if not in regExcludes
                        if (excluded === false) {
                            results.push(file);

                            // Check if its a folder
                            _fs2.default.stat(file, function (err, stat) {
                                if (stat && stat.isDirectory()) {

                                    // If it is, walk again
                                    walk(file, regExcludes, function (err, res) {
                                        results = results.concat(res);

                                        if (! --pending) {
                                            done(null, results);
                                        }
                                    });
                                } else {
                                    if (! --pending) {
                                        done(null, results);
                                    }
                                }
                            });
                        } else {
                            if (! --pending) {
                                done(null, results);
                            }
                        }
                    });
                });
            };

            var execludeTestFilePatterns = ['compiled', 'spec', 'test'];

            var regExcludes = [/index\.html/, /js\/lib\.js/, /node_modules/];

            walk('./' + options.cwd, regExcludes, function (err, results) {
                if (err) {
                    throw err;
                }
                var filtered = results.filter(function (file) {
                    //execlude array
                    var e = execludeTestFilePatterns.length;
                    while (e--) {
                        var reg = new RegExp(execludeTestFilePatterns[e] + '.js$', 'gi');
                        if (reg.test(file)) {
                            return false;
                        }
                    }
                    return (/\.js$/ig.test(file)
                    );
                });
            });

            _through2.default.obj(function (file, enc, cb) {

                //options.testFileSuffix = new Buffer(options.testFileSuffix);

                if (file.isNull()) {
                    return cb(null, file);
                }
                if (file.isStream()) {
                    this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
                    return cb();
                }
                if (file.isBuffer()) {

                    if (!_helper2.default.isAngular(file)) {
                        console.log('Skipped:', 'not angular file', "File not created");
                        return cb();
                    }

                    if (_helper2.default.hasTest(file)) {
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

                    var match = _helper2.default.getAllProviders(file.contents);
                    var matchFunctions = _helper2.default.getAllFunctions(file.contents);
                    var matchServices = undefined;

                    var opt = {
                        date: new Date(),
                        type: null,
                        typeName: null,
                        module: opts.projectPrefix + '.' + _helper2.default.truncateJsSuffix((0, _lodash2.default)(file.path.split('/')).last()),
                        dependency: null,
                        directiveName: null,
                        path: file.path,
                        filename: (0, _lodash2.default)(file.path.split('/')).last(),
                        amdPath: 'namm',
                        name: _helper2.default.truncateJsSuffix((0, _lodash2.default)(file.path.split('/')).last()),
                        capitalizedName: _helper2.default.capitalize(_helper2.default.truncateJsSuffix((0, _lodash2.default)(file.path.split('/')).last()))
                    };
                    console.log(match[0]);
                    if (match) {
                        opt.type = match[1];
                        opt.typeName = match[2];
                        matchServices = _helper2.default.getAllServices();
                    }

                    if (opt.type === 'directive') {
                        opt.directiveName = _helper2.default.dasherize(opt.typeName);
                    }

                    if (matchFunctions !== null) {
                        opt.funcObj = matchFunctions;
                    }

                    if (opt.type === 'service' || 'factory') {
                        opt.services = matchServices;
                    }

                    opt.caches = _helper2.default.getAllCache(file.contents);
                    /**
                     *
                     * @type {{functions: *}}
                     */
                    testObject = {
                        module: _helper2.default.getAllModules(file.contents),
                        dependency: _helper2.default.getAllModuleDependency(file.contents),
                        providers: _helper2.default.getAllProviders(file.contents),
                        functions: _helper2.default.getAllFunctions(file.contents),
                        cache: _helper2.default.getAllCache(file.contents),
                        services: _helper2.default.getAllServices(file.contents)
                    };

                    _fs2.default.writeFile('message.json', JSON.stringify(testObject), 'utf8', function (response) {
                        console.log("Test file: ", response);
                    });
                    var templateFile = opt.type === void 0 ? 'angular.' + opt.type + '.temp' : 'angular.module.temp';
                    var fileContent = String(_fs2.default.readFileSync(__dirname + "/templates/" + templateFile, "utf8"));

                    var compiled = _lodash2.default.template(fileContent);

                    file.contents = new Buffer(compiled(opt));

                    file.path = _helper2.default.replaceExtension(file.path, '.spec.js'); // file.js
                    console.log('Created test files: ', (0, _lodash2.default)(file.path.split('/')).last());
                }

                cb(null, file);
                //cb(null);
            });
        }
    }]);

    return EPISTO;
})();

module.exports = new EPISTO();

//# sourceMappingURL=tester-compiled.js.map