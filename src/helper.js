//helper.js
/**
 * Created by David Breuer on 18/11/15.
 *
 * @file helper.js
 * @description
 *
 */
'use strict';
var fs = require('fs');


function testHelper() {}

testHelper.prototype.truncateJsSuffix = function(name) {

    return name.replace(/.js$/i, '');
};

testHelper.prototype.capitalize = function(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
};

testHelper.prototype.dasherize = function( string ) {
    return string. replace ( /([^])([A-Z]+)([^$])/g, '$1-$2$3' ). toLowerCase();
};
testHelper.prototype.isAngular = function( file ) {
    var angularRegExp = /\.(module)[\(\']'(.*)'/g;
    var match = angularRegExp.exec(String(file.contents));
    return match!==null;
};

testHelper.prototype.hasTest = function( file ) {
    if (fs.existsSync(file.path.replace('.js', '.spec.js'))) {
        return true;
    }

    if (file.path.indexOf('min.js') > -1) {
        return true;
    }

    if (file.path.indexOf('test.js') > -1) {
        return true;
    }

    if (file.path.indexOf('build.js') > -1) {
        return true;
    }

    if (file.path.indexOf('bower_components') > -1) {
        return true;
    }
    return false;
};

testHelper.prototype.getAllServices = function( content, serviceName ) {
    var m;
    var out = [];
    var re = /\$http.(get|delete)\((.*?)\)+.then\((.*?)\)/g;
    while ((m = re.exec(content)) !== null) {
        if (m.index === re.lastIndex) { re.lastIndex++; }
        var tmpType = m[1];
        var tmpUrl = m[2];
        var tmpCallbacks = m[3].split(',');
        tmpCallbacks = tmpCallbacks.map(function(s) { return s.trim(); });
        out.push({name: serviceName, type: tmpType, url: tmpUrl, callbacks: tmpCallbacks});
    }
    return out;
};

testHelper.prototype.getAllFunctions = function( content ) {
    var m;
    var out = [];
    var re = /function\s+(.\w*)\((.*)\)/gm;
    while ((m = re.exec(content)) !== null) {
        if (m.index === re.lastIndex) { re.lastIndex++; }
        var tmpName = m[1];
        var tmpDep = m[2].split(',');
        tmpDep = tmpDep.map(function(s) { return s.trim(); });
        out.push({name: tmpName, dep: tmpDep});
    }
    return out;
};


module.exports = new testHelper();