const path = require('path');
module.exports = {
    HtmlWebpackPlugin: require('./HtmlWebpackPlugin'),
    entry: {
        'base': path.resolve(__dirname, '../src/main.js'),
        'index': path.resolve(__dirname, '../src/entryPagePoints/home.js'),
        'form-submited': path.resolve(__dirname, '../src/entryPagePoints/form-submited.js'),
    },
};