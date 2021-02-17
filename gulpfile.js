var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");

sass.compiler = require('sass');

function compileScssTask() {
    return gulp.src('./Resources/Styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./assets"));
}

function postCssTask() {
    var plugins = [
        cssnano(),
        autoprefixer()
    ];

    return gulp.src("./assets/*.css")
        .pipe(postcss(plugins))
        .pipe(gulp.dest("./assets"));
}

gulp.task("compile:scss", compileScssTask);
gulp.task("postcss:css", postCssTask);

gulp.task("watch:scss", function () {
    gulp.watch("./Styles/**/*.scss", gulp.series("compile:scss"));
});

gulp.task("build:css", gulp.series("compile:scss", "postcss:css"));