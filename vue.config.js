/*
 * @Author: 汪锦
 * @Date: 2020-06-19 14:44:55
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 17:15:09
 * @Description: vue配置
 */
const path = require('path')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
  },
  /* less全局公共配置 */
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "./src/style/globalStyle_var.less")
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
      },
    },
  },
  publicPath: './',
}
