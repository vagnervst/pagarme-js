var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
	script: ['src/head.js', 'bower_components/jsencrypt/bin/jsencrypt.js', 'src/validator.js', 'src/body.js', 'src/tail.js']
};

gulp.task('pagarme', function() {
	return gulp.src(paths.script)
		.pipe(concat('pagarme.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('pagarme.min', function() {
	return gulp.src(paths.script)
		.pipe(concat('pagarme.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.script, ['pagarme', 'pagarme.min']);
});

gulp.task('build', ['pagarme', 'pagarme.min']);

gulp.task('default', ['pagarme', 'pagarme.min', 'watch']);
