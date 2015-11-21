/**
 * Created by dbreuer83 on 13/11/15.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var karmatest = require('../index.js');
var del = require('del');
var Server = require('karma').Server;

gulp.task('clean', function() {
    del(['test/frontend/unit']);
});

gulp.task('build', function() {

    del(['**/*.spec.js']);
    gulp.src(['src/**/*.js'])
        .pipe(karmatest.init())
        .pipe(gulp.dest('test'));
});

/** single run */
gulp.task('test', function(done) {
    new Server({configFile: require('path').resolve('karma.conf.js'),
        autoWatch: false,
        singleRun: true
    }, done).start();
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('test-dev', function(done) {
    new Server({configFile: require('path').resolve('karma.conf.js'),
        autoWatch: true,
        singleRun: false
    }, done).start();
});

gulp.task('default', ['build', 'test']);