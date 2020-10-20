const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');
const progeny = require('gulp-progeny'); //stylus,sass依存関係(パーシャル)を解決
const stylus = require('gulp-stylus') //stylusコンパイル
const postcss = require('gulp-postcss') //stylusコンパイル後の処理
const autoprefixer = require('autoprefixer') //ベンダープレフィックス
const sourcemaps = require('gulp-sourcemaps'); //ソースマップ作成
const cache = require('gulp-cached'); //変更のあったものを記録(css用)
const plumber = require('gulp-plumber'); //watch中にエラー防止
const notify = require('gulp-notify'); //エラーを通知
const browserSync = require('browser-sync') //ブラウザ自動更新
const debug = require('gulp-debug'); //デバッグ

/// abisu(stylus)コンパイル //////////////////////////////////////////
const srcAbisu = {
  srcDir: 'html/stylus/abisu.styl',
  srcCom: [
    'html/stylus/abisu.styl'
  ],
  dstDir: 'html/css'
}

function cacheAbisu() {
  return src(srcAbisu.srcDir)
    .pipe(cache('abisu'))
}

function Abisu() {
  return src(srcAbisu.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: false
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcAbisu.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// base(stylus)コンパイル //////////////////////////////////////////
const srcBase = {
  srcDir: 'html/stylus/base.styl',
  srcCom: [
    'html/stylus/base.styl'
  ],
  dstDir: 'html/css'
}

function cacheBase() {
  return src(srcBase.srcDir)
    .pipe(cache('base'))
}

function Base() {
  return src(srcBase.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: false
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcBase.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// animation(stylus)コンパイル //////////////////////////////////////////
// const srcAnimation = {
//   srcDir: 'html/stylus/animation.styl',
//   srcCom: [
//     'html/stylus/animation.styl'
//   ],
//   dstDir: 'html/css'
// }

// function cacheAnimation() {
//   return src(srcAnimation.srcDir)
//     .pipe(cache('animation'))
// }

// function Animation() {
//   return src(srcAnimation.srcCom)
//     .pipe(sourcemaps.init())
//     .pipe(progeny())
//     .pipe(plumber({
//       errorHandler: notify.onError('Error: <%= error.message %>')
//     }))
//     .pipe(stylus({
//       compress: false
//     }))
//     .pipe(postcss([autoprefixer()]))
//     .pipe(sourcemaps.write('/'))
//     .pipe(dest(srcAnimation.dstDir))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// }


/// components(stylus)コンパイル //////////////////////////////////////////
const srcComponents = {
  srcDir: 'html/stylus/components/*.styl',
  srcCom: [
    'html/stylus/components.styl',
    // '!' + 'html/stylus/**/_*.styl',
  ],
  // dstBack: 'html/stylus',
  dstDir: 'html/css'
}

function cacheComponents() {
  return src(srcComponents.srcDir)
    .pipe(cache('components'))
}

function Components() {
  return src(srcComponents.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: false
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcComponents.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// contents(stylus)コンパイル //////////////////////////////////////////
const srcContents = {
  srcDir: 'html/stylus/contents/*.styl',
  srcCom: [
    'html/stylus/style.styl',
    // '!' + 'html/stylus/**/_*.styl',
  ],
  // dstBack: 'html/stylus',
  dstDir: 'html/css'
}

function cacheContents() {
  return src(srcContents.srcDir)
    .pipe(cache('contents'))
}

function Contents() {
  return src(srcContents.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: false
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcContents.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// HTML監視 ////////////////////////////////////////////
var srcHTML = {
  srcDir: 'html/**/*.html',
}

function HTML() {
  return src(srcHTML.srcDir)
    .pipe(cache('html'))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// ブラウザ自動更新 ////////////////////////////////////////////
const browserSyncFunc = () => {
  browserSync({
    server: {
      baseDir: 'html',
      index: 'index.html',
    },
  })
}


/// 監視ファイル ////////////////////////////////////////////
function watchFile() {
  watch(srcAbisu.srcDir, series(cacheAbisu, Abisu))
  watch(srcBase.srcDir, series(cacheBase, Base))
  // watch(srcAnimation.srcDir, series(cacheAnimation, Animation))
  watch(srcComponents.srcDir, series(cacheComponents, Components))
  watch(srcContents.srcDir, series(cacheContents, Contents))
  watch(srcHTML.srcDir, HTML)
}


/// Gulpコマンドで動かすもの ////////////////////////////////////////////
exports.default = parallel(watchFile, browserSyncFunc); //Stylusリアルタイム更新
