'use strict'
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

const productionGzipExtensions = ['js', 'css', 'jpg', 'jpeg', 'png']

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue-template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: name,
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   },
    // },
  },
  configureWebpack: config => {
    // if(process.env.NODE_ENV !== 'development'){
    //   config.plugins = [
    //     new CompressionPlugin({
    //       filename: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
    //       threshold: 10240,//对10K以上的数据进行压缩
    //       minRatio: 0.8,
    //       deleteOriginalAssets:false,//是否删除源文件
    //     })
    //   ]
    // }
    config.name = name
    config.resolve.alias = {
      '@': resolve('src')
    }
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, 'node_modules')]
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') //
    config.plugins.delete('prefetch') //

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === '.env.development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== '.env.development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
