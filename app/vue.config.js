const webpack = require('webpack');
module.exports = {
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('src/components/icons')
      return [options]
    })
  }
}
