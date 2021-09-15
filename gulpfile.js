// Import all modules
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Vars for different paths
scssSrcPath = "app/scss/style.scss";
scssDstPath = "dist/css";

jsSrcPath = "app/js/script.js";
jsDstPath = "dist/js";

allScssFiles = "app/scss/**/*.scss";
allJsFiles = "app/**/*.js";
allHtmlFiles = "*.html";

// Sass Task
function scssTask() {
  return gulp
    .src(scssSrcPath, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(scssDstPath, { sourcemaps: "." }));
}

// JS Task
function jsTask() {
  return gulp
    .src(jsSrcPath, { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(gulp.dest(jsDstPath, { sourcemaps: "." }));
}

// Browser Sync
function browserSyncLoader(done) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });

  done();
}

function browserSyncReload(done) {
  browsersync.reload();

  done();
}

// Watch Task
function watchTask() {
  gulp.watch(allHtmlFiles, browserSyncReload);
  gulp.watch(
    [allScssFiles, allJsFiles],
    gulp.series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = gulp.series(scssTask, jsTask, browserSyncLoader, watchTask);

// Build Gulp Task
exports.build = gulp.series(scssTask, jsTask);
