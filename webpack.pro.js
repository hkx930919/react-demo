const WebpackMerge = require('webpack-merge')
const ommon = require('./webpack.common.js')
module.exports = WebpackMerge(webpackCommon,{
    mode:'production',
    devtool:'inline-source-map',
})