const path = require('path');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	// 入口
	entry: {
		app:  [
		'react-hot-loader/patch',
		path.join(__dirname, 'src/index.js')
		],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},

	devtool: 'cheap-module-source-map',

	// 输出到dist文件夹，输出文件名字为bundle.js
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		publicPath: '/',
		chunkFilename: '[name].[chunkhash].js'
	},

	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
		}, 
		{
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}]
		}]
	},

	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			component: path.join(__dirname, 'src/component'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
			reducers: path.join(__dirname, 'src/redux/reducers')
		}
	},

	plugins: [	
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor'
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.join(__dirname, 'src/index.html')
	}),
	new UglifyJSPlugin(),
	new CleanWebpackPlugin(['dist']),
	new ExtractTextPlugin({
		filename: '[name].[contenthash:5].css',
		allChunks: true
	})
	]
}

