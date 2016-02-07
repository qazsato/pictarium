var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var fs          = require('fs');
var path        = require('path');
var browserSync = require('browser-sync');

var ENV = process.env.NODE_ENV;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'last 2 ff versions',
  'last 2 edge versions',
  'last 2 chrome versions',
  'last 2 safari versions',
  'ios >= 7',
  'android >= 4.0'
];

var SRC = {
  ROOT   : 'public/src',
  JS     : ['public/src/**/*.js'],
  CSS    : ['public/src/**/*.css'],
  SASS   : ['public/src/**/*.scss'],
  IMAGE  : ['public/src/**/*.+(jpg|jpeg|png|gif|svg)'],
  OTHER  : ['public/src/**/*.*', '!public/src/**/*.+(js|css|scss|jpg|jpeg|png|gif|svg)']
};

var DEST = {
  ROOT   : 'public/dist'
};

/**
 * JSタスク。
 * srcフォルダの.jsに対し、uglifyをおこないdistフォルダへ出力します。
 * このタスクは開発・本番ともに使用します。(build/watchタスクでの使用を想定)
 */
gulp.task('js', function () {
  gulp.src(SRC.JS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.if(ENV === 'production', $.uglify()))
      .pipe(gulp.dest(DEST.ROOT));
});

/**
 * CSSタスク。
 * srcフォルダの.cssに対し、圧縮・最適化をおこないdistフォルダへ出力します。
 * このタスクは開発・本番ともに使用します。(build/watchタスクでの使用を想定)
 */
gulp.task('css', function () {
  gulp.src(SRC.CSS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.csso())
      .pipe($.cssmin())
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST.ROOT));
});

/**
 * Sassタスク。
 * srcフォルダの.scssに対し、コンパイルをおこないdistフォルダへ.cssを出力します。
 * このタスクは開発・本番ともに使用します。(build/watchタスクでの使用を想定)
 */
gulp.task('sass', function () {
  gulp.src(SRC.SASS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.sass())
      .pipe($.if(ENV === 'production', $.cssmin()))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST.ROOT));
});

/**
 * Imageタスク。
 * srcフォルダの画像(スプライト画像除く)に対し、画像圧縮処理をおこないdistフォルダへ出力します。
 * このタスクは開発・本番ともに使用します。(build/watchタスクでの使用を想定)
 */
gulp.task('image', function () {
  gulp.src(SRC.IMAGE)
      .pipe($.changed(DEST.ROOT))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.imagemin())
      .pipe(gulp.dest(DEST.ROOT));
});

/**
 * Otherタスク。
 * js/css/sass/imageを除いたファイルに対し、distフォルダへ出力します。
 * このタスクは開発・本番ともに使用します。(build/watchタスクでの使用を想定)
 */
gulp.task('other', function () {
  gulp.src(SRC.OTHER)
      .pipe(gulp.dest(DEST.ROOT));
});

/**
 * cleanタスク。
 * distフォルダ内の全ファイルを削除します。
 * このタスクは開発・本番ともに使用します。(buildタスクでの使用を想定)
 */
gulp.task('clean', function () {
  return del(DEST.ROOT);
});

/**
 * browserSyncタスク。
 * ローカルと同期し、自動でブラウザリロードをおこないます。
 * このタスクは開発時のみ使用します。(browseタスクでの使用を想定)
 */
gulp.task('sync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*', '!**/.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: true
  });
});

/**
 * browseタスク。
 * ファイルの変更を監視し、変更を検知したら自動でブラウザリロードを行います。
 * このタスクは開発時のみ使用します。
 */
gulp.task('browse', function () {
  runSequence('watch', 'sync');
});

/**
 * watchタスク。
 * srcフォルダ内の全ファイルを監視し、変更があった場合各タスクを実行します。
 * このタスクは開発時のみ使用します。
 */
gulp.task('watch', function () {
  gulp.watch(SRC.JS, ['js']);
  gulp.watch(SRC.CSS, ['css']);
  gulp.watch(SRC.SASS, ['sass']);
  gulp.watch(SRC.IMAGE, ['image']);
  gulp.watch(SRC.OTHER, ['other']);
});

/**
 * buildタスク。
 * distフォルダをクリーンしたのち、srcフォルダの各ファイルをdistフォルダに出力します。
 * このタスクは開発・本番ともに使用します。
 */
gulp.task('build', function () {
  runSequence('clean', ['js', 'css', 'sass', 'image', 'other']);
});
