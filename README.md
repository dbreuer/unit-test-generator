# gulp-create-test-files



## Installation

The easiest way is to install `gulp-create-test-files` as a `devDependency`,
by running

```bash
npm install gulp gulp-create-test-files --save-dev
```


## Examples

### Basic

```javascript
var gulpCTF = require('gulp-create-test-files');
//
gulp.task('create-test', function() {

    var options = {
        src: './src/',
        dist: './dist/',
        temp: './templates/',
        testFileSuffix: '.spec.js',
        projectPrefix: 'projectName'
    };

    gulp.src(['src/**/*.js'])
        .pipe(gulpCTF(options))
        .pipe(gulp.dest('test'));
});
```



For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
