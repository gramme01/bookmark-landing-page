var gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require("gulp-sourcemaps"),
	browsersync = require("browser-sync").create(),
	concat = require("gulp-concat");

function css() {
	return gulp
		.src("src/css/style.css")
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist"));
}

function js() {
	return gulp
		.src("src/js/*.js")
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(concat("all.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist"));
}

function watch() {
	browsersync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("src/css/style.css", css);
	gulp.watch("src/js/*.js", js);
	gulp.watch(["index.html", "dist/style.css", "dist/all.js"]).on(
		"change",
		browsersync.reload
	);
}
exports.css = css;
exports.js = js;
exports.watch = watch;

var build = gulp.parallel(watch);
gulp.task("default", build);

/*

//Scripts Task
task("scripts", function() {
	return src("src/js/*.js")
		.pipe(concat(all.js))
		.pipe(dest("dist"));
});

//Browser Sync
task("browsersync", function() {
	return browsersync.init({
		server: {
			baseDir: "./"
		}
	});
});

//watch
task("watch", function() {
	watch("src/css/style.css", series("styles", browsersync.reload));
	watch("src/js/*.js", series("scripts", browsersync.reload));
});

task("default", parallel("styles", "scripts", "browsersync", "watch"));
*/
