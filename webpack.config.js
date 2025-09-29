const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
        clean: true   // limpia la carpeta dist en cada build
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    /* 'style-loader', // inyecta CSS en el DOM */
                    MiniCssExtractPlugin.loader, 
                    'css-loader',   // interpreta @import y url()
                    'sass-loader'   // compila SCSS a CSS
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject : 'head'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css' // Nombre del archivo CSS de salida
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    devtool: 'source-map'
}