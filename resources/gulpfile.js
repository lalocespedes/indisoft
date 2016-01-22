'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var bower = require('gulp-bower');

var config = {
    sassPath: './sass',
    bowerDir: './bower_components',
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: '../assets'
};

gulp.task('default', function() {

    console.log('You ran');

});

gulp.task('styles', function() {

    gulp.src([
        config.bowerDir + '/angular-toastr/dist/angular-toastr.min.css',
        config.bowerDir + '/ng-dialog/css/ngDialog.min.css',
        config.bowerDir + '/ng-dialog/css/ngDialog-theme-default.min.css',
        './css/general.css'

    ])
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.publicDir + '/css'));


    //sass
    return gulp.src('./css/styles.scss')
        .pipe(sass({
            includePaths: [
                config.bootstrapDir + '/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss'
            ]
        }))
        .pipe(gulp.dest(config.publicDir + '/css'));

});

gulp.task('vendor', function() {
    gulp.src([
        config.bowerDir + '/angular/angular.js',
        config.bowerDir + '/angular-animate/angular-animate.js',
        config.bowerDir + '/angular-resource/angular-resource.js',
        config.bowerDir + '/angular-sanitize/angular-sanitize.js',
        config.bowerDir + '/angular-ui-router/release/angular-ui-router.min.js',
        config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
        config.bowerDir + '/angularUtils-pagination/dirPagination.js',
        config.bowerDir + '/angular-toastr/dist/angular-toastr.tpls.js',
        config.bowerDir + '/ng-dialog/js/ngDialog.min.js'

    ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.publicDir + '/js'));

    gulp.src('./bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('angular', function() {

    gulp.src([
        './js/src/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: false}))
        //.pipe(rev())
        .pipe(gulp.dest(config.publicDir + '/js'))
    //.pipe(rev.manifest('rev-manifiest-angular'))
    //.pipe(revDel({ dest: './public/scripts' }))
    .pipe(gulp.dest(config.publicDir + '/public/scripts'));
});

gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['styles']);
    gulp.watch('./js/src/**/*.js', ['angular']);
    gulp.watch(['./js/src/views/**/*.html'], ['ngtemplates']);

});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('ngtemplates', function() {

    return gulp.src('./js/src/views/**/*.html')
        .pipe(minifyHTML({ empty: true, quotes: true }))
        .pipe(templateCache({ module: 'myApp'}))
        .pipe(gulp.dest(config.publicDir + '/js/'));
});
