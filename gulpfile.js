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
const cleanCss = require('gulp-clean-css'); //cssを最小化
const rename = require('gulp-rename'); //リネーム
const imagemin = require('gulp-imagemin'); //画像圧縮
const pngquant = require('imagemin-pngquant'); //png画像の圧縮 
const changed = require('gulp-changed'); //画像の差分を取得
const filelog = require('gulp-filelog'); //処理されたファイル名をログに流す
const imageResize = require('gulp-image-resize'); //画像をリサイズする
const webp = require('gulp-webp'); //画像をwebpに変換する
const ejs = require('gulp-ejs'); //ejsファイル
const htmlbeautify = require('gulp-html-beautify'); //コード整形
const fs = require('fs'); //jsonファイル操作
const header = require('gulp-header'); //コメントアウトをファイルの先頭に追記
const sass = require('gulp-sass')(require('sass')); //sassコンパイル


const pkg = require('./package.json'); //package.jsonの記述内容をコメントアウトに使用する

// バージョン情報などのコメントアウト自動挿入
const banner = ['/**',
  ' * @version <%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @description <%= pkg.description %>',
  ' */',
  ''
].join('\n');

/// base(stylus)コンパイル //////////////////////////////////////////
const srcBase = {
  srcDir: 'html/stylus/base.styl',
  srcCom: [
    'html/stylus/base.styl'
  ],
  dstDir: 'html/css',
  minDir: 'html/css/base.css'
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
}

function BaseMin() {
  return src(srcBase.minDir)
    .pipe(cleanCss())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(srcBase.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/// base_k(stylus)コンパイル //////////////////////////////////////////
// const srcBaseK = {
//   srcDir: 'html/stylus/base_k.styl',
//   srcCom: [
//     'html/stylus/base_k.styl'
//   ],
//   dstDir: 'html/css',
//   minDir: 'html/css/base_k.css'
// }

// function cacheBaseK() {
//   return src(srcBaseK.srcDir)
//     .pipe(cache('base_k'))
// }

// function BaseK() {
//   return src(srcBaseK.srcCom)
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
//     .pipe(dest(srcBaseK.dstDir))
// }

// function BaseKMin() {
//   return src(srcBaseK.minDir)
//     .pipe(cleanCss())
//     .pipe(header(banner, {
//       pkg: pkg
//     }))
//     .pipe(rename({
//       extname: '.min.css'
//     }))
//     .pipe(dest(srcBaseK.dstDir))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// }

/// style.stylコンパイル //////////////////////////////////////////
const srcStyles = {
  srcDir: 'html/stylus/style.styl',
  srcCom: [
    'html/stylus/style.styl',
  ],
  dstDir: 'html/css'
}

function cacheStyles() {
  return src(srcStyles.srcDir)
    .pipe(cache('style'))
}

function Styles() {
  return src(srcStyles.srcCom)
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
    .pipe(dest(srcStyles.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// components(stylus)コンパイル //////////////////////////////////////////
const srcComponents = {
  srcDir: 'html/stylus/components/*.styl',
  srcCom: [
    'html/stylus/components.styl',
  ],
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
  ],
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

/// import(stylus)コンパイル //////////////////////////////////////////
const srcImport = {
  srcDir: 'html/stylus/_*.styl',
  srcCom: [
    'html/stylus/style.styl'
  ],
  dstDir: 'html/css'
}

function cacheImport() {
  return src(srcImport.srcDir)
    .pipe(cache('_'))
}

function Import() {
  return src(srcImport.srcCom)
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
    .pipe(dest(srcImport.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/// style.scssコンパイル //////////////////////////////////////////
const srcSassStyles = {
  srcDir: 'html/sass/style.scss',
  srcCom: [
    'html/sass/style.scss',
  ],
  dstDir: 'html/css'
}

function cacheSassStyles() {
  return src(srcSassStyles.srcDir)
    .pipe(cache('style'))
}

function SassStyles() {
  return src(srcSassStyles.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcSassStyles.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/// import(sass)コンパイル //////////////////////////////////////////
const srcSassImport = {
  srcDir: 'html/sass/_*.scss',
  srcCom: [
    'html/sass/style.scss'
  ],
  dstDir: 'html/css'
}

function cacheSassImport() {
  return src(srcSassImport.srcDir)
    .pipe(cache('_'))
}

function SassImport() {
  return src(srcSassImport.srcCom)
    .pipe(sourcemaps.init())
    .pipe(progeny())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(srcSassImport.dstDir))
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

/// JS監視 ////////////////////////////////////////////
var srcJS = {
  srcDir: 'html/js/*.js',
}

function JS() {
  return src(srcJS.srcDir)
    .pipe(cache('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/// ejs監視 ////////////////////////////////////////////
var srcEjs = {
  watchDir: 'html/**/*.ejs',
  srcDir: [
    'html/**/*.ejs',
    "!" + "html/**/_*.ejs"
  ],
  incDir: "html/**/_*.ejs",
  jsonDir: 'data/site.json',
  dstDir: 'html'
}

// 変更のあったファイルのみ変換
function ejsToHTML() {
  return src(srcEjs.srcDir)
    .pipe(cache('ejs'))
    .pipe(plumber())
    .pipe(ejs({
      jsonData: JSON.parse(fs.readFileSync(srcEjs.jsonDir))
    }))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 0,
        preserve_newlines: false,
        indent_inner_html: false,
        extra_liners: [],
      })
    )
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(dest(srcEjs.dstDir));
}

// 全てのファイルを変換
function allToHTML() {
  return src(srcEjs.srcDir)
    .pipe(plumber())
    .pipe(ejs({
      jsonData: JSON.parse(fs.readFileSync(srcEjs.jsonDir))
    }))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 0,
        preserve_newlines: false,
        indent_inner_html: false,
        extra_liners: [],
      })
    )
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(dest(srcEjs.dstDir));
}


/// ブラウザ自動更新 ////////////////////////////////////////////
const browserSyncFunc = () => {
  browserSync({
    server: {
      baseDir: 'html',
      index: 'index.html',
      open: 'external',
      https: true,
      cors: true,
    },
  })
}


const srcImage = {
  comDir: 'compression/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  resize2000Dir: 'resize/to_2000/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  resize1500Dir: 'resize/to_1500/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  resize1000Dir: 'resize/to_1000/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  resize800Dir: 'resize/to_800/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  resize500Dir: 'resize/to_500/*.{jpg,jpeg,JPG,JPEG,png,gif,svg,webp}',
  dstDir: 'html/images'
}
const mozjpegOptions = {
  quality: 80
}
const svgoOptions = {
  plugins: [{
    removeViewBox: true
  }, {
    cleanupIDs: false
  }]
}
const gifsicleOptions = {
  interlaced: true
}
const pngquantOptions = {
  quality: [0.65, 0.8],
  speed: 1
}

/// 画像圧縮 //////////////////////////////////////////
function imageMinCom() {
  return src(srcImage.comDir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          mozjpegOptions
        }),
        imagemin.svgo({
          svgoOptions
        }),
        imagemin.gifsicle({
          gifsicleOptions
        }),
        pngquant({
          pngquantOptions
        }),
      ])
    )
    .pipe(dest(srcImage.dstDir))
}

/// 画像リサイズ＋webp変換 //////////////////////////////////////////
function imageResize2000() {
  return src(srcImage.resize2000Dir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imageResize({
        width: 2000,
        crop: false,
        upscale: false
      })
    )
    .pipe(dest(srcImage.dstDir))
    .pipe(filelog())
}

function imageResize1500() {
  return src(srcImage.resize1500Dir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imageResize({
        width: 1500,
        crop: false,
        upscale: false
      })
    )
    .pipe(rename(function (path) {
      path.basename += path.extname;
    }))
    .pipe(webp())
    .pipe(dest(srcImage.dstDir))
    .pipe(filelog())
}

function imageResize1000() {
  return src(srcImage.resize1000Dir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imageResize({
        width: 1000,
        crop: false,
        upscale: false
      })
    )
    .pipe(rename(function (path) {
      path.basename += path.extname;
    }))
    .pipe(webp())
    .pipe(dest(srcImage.dstDir))
    .pipe(filelog())
}

function imageResize800() {
  return src(srcImage.resize800Dir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imageResize({
        width: 800,
        crop: false,
        upscale: false
      })
    )
    .pipe(rename(function (path) {
      path.basename += path.extname;
    }))
    .pipe(webp())
    .pipe(dest(srcImage.dstDir))
    .pipe(filelog())
}

function imageResize500() {
  return src(srcImage.resize500Dir)
    .pipe(changed(srcImage.dstDir))
    .pipe(
      imageResize({
        width: 500,
        crop: false,
        upscale: false
      })
    )
    .pipe(rename(function (path) {
      path.basename += path.extname;
    }))
    .pipe(webp())
    .pipe(dest(srcImage.dstDir))
    .pipe(filelog())
}

/// 画像をwebpに変換 //////////////////////////////////////////
const srcWebp = {
  srcDir: 'webp/*.{jpg,jpeg,JPG,JPEG,png,gif,svg}',
  dstDir: 'html/images'
}

function imageToWebp() {
  return src(srcWebp.srcDir)
    .pipe(changed(srcWebp.dstDir))
    .pipe(rename(function (path) {
      path.basename += path.extname;
    }))
    .pipe(webp())
    .pipe(dest(srcWebp.dstDir));
}

/// 監視ファイル ////////////////////////////////////////////
function watchFile() {
  watch(srcBase.srcDir, series(cacheBase, Base, BaseMin))
  // watch(srcBaseK.srcDir, series(cacheBaseK, BaseK, BaseKMin))
  watch(srcStyles.srcDir, series(cacheStyles, Styles))
  watch(srcSassStyles.srcDir, series(cacheSassStyles, SassStyles))
  watch(srcComponents.srcDir, series(cacheComponents, Components))
  watch(srcContents.srcDir, series(cacheContents, Contents))
  watch(srcImport.srcDir, series(cacheImport, Import))
  watch(srcSassImport.srcDir, series(cacheSassImport, SassImport))
  watch(srcHTML.srcDir, HTML)
  watch(srcJS.srcDir, JS)
  watch(srcEjs.watchDir, ejsToHTML)
  watch(srcEjs.incDir, allToHTML)
  watch(srcEjs.jsonDir, allToHTML)
  watch(srcImage.comDir, imageMinCom)
  watch(srcImage.resize2000Dir, imageResize2000)
  watch(srcImage.resize1500Dir, imageResize1500)
  watch(srcImage.resize1000Dir, imageResize1000)
  watch(srcImage.resize800Dir, imageResize800)
  watch(srcImage.resize500Dir, imageResize500)
  watch(srcWebp.srcDir, imageToWebp)
}


/// Gulpコマンドで動かすもの ////////////////////////////////////////////
exports.default = parallel(watchFile, browserSyncFunc); //リアルタイム更新