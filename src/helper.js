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
testHelper.prototype.getAllCache = function( content ) {
    var m;
    var out = [];
    var re = /CacheFactory\.get\('(\w*)'\)/gm;
    while ((m = re.exec(content)) !== null) {
        if (m.index === re.lastIndex) { re.lastIndex++; }
        if (out.indexOf(m[1])===-1) {
            out.push(m[1]);
        }

    }
    return out;
};

testHelper.prototype.getAllServices = function( content ) {
    var m;
    var out = [];
    var re = /function\s+(.\w*)\((.*)\)[\s\{]+return\s(.*http.*)/gm;
    var reService = /\$http.(get|delete)\((.*?)\)+.then\((.*?)\)/g;
    while ((m = re.exec(content)) !== null) {
        var tmpName, tmpDeps, tmpType, tmpUrl, tmpCallbacks;
        if (m.index === re.lastIndex) { re.lastIndex++; }
        var mService = reService.exec(m[3]);
        tmpName = m[1];
        tmpDeps = m[2].split(',');
        tmpDeps = tmpDeps.map(function(s) { return s.trim(); });
        if (mService !== null) {
            tmpType = mService[1].toUpperCase();
            tmpUrl = mService[2];
            tmpCallbacks = mService[3].split(',');
            tmpCallbacks = tmpCallbacks.map(function(s) { return s.trim(); });
        }

        out.push({name: tmpName, dep: tmpDeps, type: tmpType, url: tmpUrl, callbacks: tmpCallbacks});
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

testHelper.prototype.getAllDrupal = function( content ) {
    var m;
    var out = [];
    var re = /Drupal\.([\w\W]*)/gm;
    while ((m = re.exec(content)) !== null) {
        if (m.index === re.lastIndex) { re.lastIndex++; }
        out.push(m[1]);
    }
    return out;

}


module.exports = new testHelper();