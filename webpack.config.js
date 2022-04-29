const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devServer: {
		static: './src',
	},
	plugins: [
		new HtmlWebpackPlugin({template: './src/index.pug', filename: 'index.html',}),
		new HtmlWebpackPlugin({template: './src/search-room.pug', filename: 'search-room.html',}),
		new HtmlWebpackPlugin({template: './src/room-details.pug', filename: 'room-details.html',}),
		new HtmlWebpackPlugin({template: './src/registration.pug', filename: 'registration.html',}),
		new HtmlWebpackPlugin({template: './src/sign-in.pug', filename: 'sign-in.html',}),
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			"window.jQuery":'jquery',
			'window.$': 'jquery',
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		pathinfo: false,
		clean: true,
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
		splitChunks: {
       	cacheGroups: {
         	vendor: {
           		test: /[\\/]node_modules[\\/]/,
           		name: 'vendors',
           		chunks: 'all',
         	},
       	},
     	},
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader','css-loader','sass-loader','postcss-loader'],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.tsx','.ts','.js'],
  },
};