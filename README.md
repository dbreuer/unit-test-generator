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
var karmacreator = require('gulp-create-test-files');
//
gulp.task('create-test', function() {
    var BASE_DIR = 'your/module/base/path/here';
    var TEST_DIR = 'your/test/folder/in/the/module';
    //del([BASE_DIR + TEST_DIR + '/*.spec.js']);
    gulp.src([BASE_DIR + 'js/**/*.js'])
        .pipe(karmacreator.init())
        .pipe(gulp.dest(BASE_DIR + TEST_DIR));
});
```



For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
