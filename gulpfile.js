/*
 * @author  Geaaru, geaaru@gmail.com
 * $Id$
 */

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

// ON PRODUCTION THIS MUST BE SET TO false
var devEnv = true;

// -----------------------------------------------------------------------
// PATHS
// -----------------------------------------------------------------------
var paths = {
    scripts: [ 'public/javascripts/*.js' ],
    css: 'public/stylesheets/*.css',

    // Jquery
    jquery: (devEnv === true ? 'node_modules/jquery/dist/jquery.js'
        : 'node_modules/jquery/dist/jquery.min.js'),

    // Semantic Ui (Note: an alternative it is use of semantic.json.example and
    // install files with gulp install under semantic-ui module directory)
    semantic_ui: [
        'node_modules/semantic-ui/dist/***',
        'node_modules/semantic-ui/dist/**/*'
    ],

};
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// DEST DIRECTORIES
// -----------------------------------------------------------------------
var dests = {
    scripts: 'public/javascripts/dist/',
    css: 'public/stylesheets/dist/',
    semantic_ui: 'public/semantic-ui/',
};
// -----------------------------------------------------------------------

// Lint Task
// Our lint task checks any JavaScript file in our public/javascripts/
// directory and makes sure there are no errors in our code.
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
// The scripts task concatenates all JavaScript files in our public/javascripts/
// directory and saves the ouput to our dist/ directory. Then gulp takes that
// concatenated file, minifies it, renames it and saves it to
// the public/javascripts/dist/ directory alongside the concatenated file.
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all_dbrmwebui.js'))
        .pipe(gulp.dest(dests.scripts))
        .pipe(rename('all_dbrmwebui.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dests.scripts));
});

// Minify CSS files
gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(minifycss({keepBreaks:true}))
        .pipe(gulp.dest(dests.css));
});

// Watch Files For Changes
// The watch task is used to run tasks as we make changes to our files.
// As you write code and modify your files, the gulp.watch() method
// will listen for changes and automatically run our tasks again so
// we don't have to continuously jump back to our command-line and
// run the gulp command each time.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
});


// -----------------------------------------------------------------------
// Jquery Task
// -----------------------------------------------------------------------
gulp.task('jquery', function() {
    return gulp.src(paths.jquery)
        .pipe(gulp.dest(dests.scripts));
});

// -----------------------------------------------------------------------
// Semantic Ui Tasks
// -----------------------------------------------------------------------
gulp.task('semantic-ui', function() {
    return gulp.src( paths.semantic_ui , { base: "./node_modules/semantic-ui/dist/" })
        .pipe(gulp.dest(dests.semantic_ui));
});

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

// Default Task
gulp.task('default', [
    'jquery',
    'semantic-ui',
    'lint',
    'scripts',
    'css'
    /* 'watch' */
]);

// vim: ts=4 sw=4 expandtab
