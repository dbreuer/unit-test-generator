//filter.js
/**
 * Created by David Breuer on 15/12/15.
 *
 * @file filter.js
 * @description
 *
 */

'use strict';

var _ = require('lodash');

var config = require('./config');

////////

module.exports = filter;

////////

function filter(all) {

    var deps = {
        known: [],
        unknown: []
    };

    var filtered = _.filter(all, function (dep) {
        return !_.contains(config.dependencies.filter, dep.name);
    });

    deps.unknown = filtered;

    return deps;
}
