import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const isDev = process.env.NODE_ENV === 'dev'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('isDev', isDev, process.env.NODE_ENV)
export default {
  mode: isDev ? 'development' : 'production',
  entry: ['./src/index.ts'],
  output: {
    path: resolve(__dirname, './assets/js'),
    filename: 'bundle.js',
    library: {
      type: 'umd',
      name: 'bundle',
    },
  },
  target: 'browserslist',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
