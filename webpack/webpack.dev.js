/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
        port: 9013,
        headers: {},
        open: true,
        proxy: {
            '/api/cemeta': {
                target: 'https://aipicture.cenmetahome.cn',
                changeOrigin: true
            }

        }
    }
});
