'use strict'
const path = require('path')

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
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
