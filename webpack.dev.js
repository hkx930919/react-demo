const WebpackMerge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
module.exports = WebpackMerge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8888
      }
})