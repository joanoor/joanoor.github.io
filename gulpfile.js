const { watch, series, src } = require('gulp')
const clean = require('gulp-clean')
const { resolve } = require('path')
const { webpack } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isDev = process.argv.indexOf('--develop') >= 0
const destDir = resolve(__dirname, './assets/js')

let plugins = []
if (!isDev) {
  plugins = [...plugins, new UglifyJsPlugin()]
}

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  entry: ['./lib/index'],
  output: {
    path: destDir,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins
}

const webpackCallback = (err, stats) => {
  if (!err) {
    console.log(
      stats.toString({
        assets: true,
        cached: false,
        colors: true,
        children: false,
        errors: true,
        warnings: true,
        version: true,
        modules: false,
        publicPath: true
      })
    )
  } else {
    console.log(err)
  }
}

function convertScript() {
  // webpackConfig.entry = jsFileMap
  webpack(webpackConfig).run(webpackCallback)
}

function cleanDist() {
  console.log('开始清理assets/js文件夹下文件...')
  return src(['bundle.js', 'bundle.js.map'], {
    cwd: destDir,
    base: destDir,
    allowEmpty: true
  }).pipe(clean())
}

function listen() {
  console.log('开始监听lib下面的js文件...')
  return watch(['lib/*.js'], build)
}

function build(cb) {
  convertScript()
  cb()
}

exports.default = series(cleanDist, build, listen)
