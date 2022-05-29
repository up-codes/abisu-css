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

/// abisu(stylus)コンパイル //////////////////////////////////////////
const srcAbisu = {
  srcDir: 'html/stylus/abisu1.1.styl',
  srcCom: [
    'html/stylus/abisu1.1.styl'
  ],
  dstDir: 'html/css',
  minDir: 'html/css/abisu1.1.css'
}

function cacheAbisu() {
  return src(srcAbisu.srcDir)
    .pipe(cache('abisu1.1'))
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

function AbisuMin() {
  return src(srcAbisu.minDir)
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(srcAbisu.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}


/// base(stylus)コンパイル //////////////////////////////////////////
const srcBase = {
  srcDir: 'html/stylus/base1.1.styl',
  srcCom: [
    'html/stylus/base1.1.styl'
  ],
  dstDir: 'html/css',
  minDir: 'html/css/base1.1.css'
}

function cacheBase() {
  return src(srcBase.srcDir)
    .pipe(cache('base1.1'))
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
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(srcBase.dstDir))
    .pipe(browserSync.reload({
      stream: true
    }))
}

/// base_k(stylus)コンパイル //////////////////////////////////////////
const srcBaseK = {
  srcDir: 'html/stylus/base_k1.1.styl',
  srcCom: [
    'html/stylus/base_k1.1.styl'
  ],
  dstDir: 'html/css',
  minDir: 'html/css/base_k1.1.css'
}

function cacheBaseK() {
  return src(srcBaseK.srcDir)
    .pipe(cache('base_k1.1'))
}

function BaseK() {
  return src(srcBaseK.srcCom)
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
    .pipe(dest(srcBaseK.dstDir))
}

function BaseKMin() {
  return src(srcBaseK.minDir)
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(srcBaseK.dstDir))
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


const srcImage = {
  comDir: 'html/compression/*.{jpg,jpeg,png,gif,svg}',
  resize2000Dir: 'html/resize/to_2000/*.{jpg,jpeg,png,gif,svg}',
  resize1500Dir: 'html/resize/to_1500/*.{jpg,jpeg,png,gif,svg}',
  resize1000Dir: 'html/resize/to_1000/*.{jpg,jpeg,png,gif,svg}',
  resize500Dir: 'html/resize/to_500/*.{jpg,jpeg,png,gif,svg}',
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

/// 画像圧縮のみ //////////////////////////////////////////
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

/// 画像リサイズ＋圧縮 //////////////////////////////////////////
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
    .pipe(filelog())
}



/// 監視ファイル ////////////////////////////////////////////
function watchFile() {
  watch(srcAbisu.srcDir, series(cacheAbisu, Abisu, AbisuMin))
  watch(srcBase.srcDir, series(cacheBase, Base, BaseMin))
  watch(srcBaseK.srcDir, series(cacheBaseK, BaseK, BaseKMin))
  // watch(srcAnimation.srcDir, series(cacheAnimation, Animation))
  watch(srcComponents.srcDir, series(cacheComponents, Components))
  watch(srcContents.srcDir, series(cacheContents, Contents))
  watch(srcHTML.srcDir, HTML)
  watch(srcImage.comDir, imageMinCom)
  watch(srcImage.resize2000Dir, imageResize2000)
  watch(srcImage.resize1500Dir, imageResize1500)
  watch(srcImage.resize1000Dir, imageResize1000)
  watch(srcImage.resize500Dir, imageResize500)
}


/// Gulpコマンドで動かすもの ////////////////////////////////////////////
exports.default = parallel(watchFile, browserSyncFunc); //リアルタイム更新