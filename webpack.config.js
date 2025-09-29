const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development';

const cssLoader = isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    mode: isDevelopment ? 'development' : 'production', 
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
                    cssLoader,
                    // interpreta @import y url()
                    {
                        loader: 'css-loader',
                        options: { sourceMap: isDevelopment }
                    },
                    // compila SCSS a CSS
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: isDevelopment }
                    }
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
        ...(isDevelopment ? [new MiniCssExtractPlugin({
            // Puedes usar [name] o algo fijo si no quieres hashes en desarrollo
            filename: '[name].[contenthash].css'
        })] : []),
    ],
    optimization: {
        minimizer: isDevelopment ? [] : ['...', new CssMinimizerPlugin()],
    },
    devtool: 'source-map'
}