const path = require('path');
const config = require('./config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: config.entry,
    output: {
        filename: './js/[name].js',
        path: __dirname + '/dist'
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    output: {comments: false}
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
            })
        ]
    },
    devtool: "source-map",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src/'),
            "js": path.resolve(__dirname, './src/assets/js'),
            "public": path.resolve(__dirname, './src/assets/'),
            "lib/js": path.resolve(__dirname, './src/assets/lib/js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            interpolate: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)/i,
                exclude: [/fonts/],
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            limit: 10000,
                            outputPath: "./images/"
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: [/fonts/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',
                        publicPath: '../fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        ...config.HtmlWebpackPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
                { from: './src/assets/icons', to: './icons' },
                { from: './src/assets/images', to: './images' },
                { from: './src/assets/video', to: './video' }
            ])
    ]
};
