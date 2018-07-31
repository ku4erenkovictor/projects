// npm i gulp, gulp-sass, gulp-concat, gulp-sourcemaps, gulp-autoprefixer, gulp-notify, gulp-clean-css, gulp-rename, gulp-if, gulp-uglifyjs, gulp-imagemin, imagemin-pngquant, gulp-cache, browser-sync --save-dev

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var cssClean = require('gulp-clean-css'); 
var rename  = require('gulp-rename');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();

var isDev = true;

gulp.task('sass', function() {
	return gulp.src('src/scss/all.scss')
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe( sass().on( 'error', notify.onError(
            {
                message: "<%= error.message %>",
                title  : "Sass Error!"
            } )))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(sass())
		.pipe(concat('all.css'))
	//	.pipe(cssClean()) Сжимаем css
	//	.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDev, sourcemaps.write()))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('jquery.main.js'))
        //.pipe(uglify()) // Сжимаем JS файл
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'));
});

gulp.task('images', function() {
    return gulp.src('public/images/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/images'));
});

gulp.task('serve', function() {
	browserSync.init({
		server:{
			baseDir: './public'
		}
	});
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'scripts', 'serve']);