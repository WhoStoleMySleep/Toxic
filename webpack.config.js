// imports
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// devServer
const devServer = {
  static: './src',
};

// plugins
const plugins = [];

const pugArray = [
  'index',
  'search-room',
  'room-details',
  'registration',
  'sign-in',
];

for (let index = 0; index < pugArray.length; index += 1) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: `./src/${pugArray[index]}.pug`,
      filename: `${pugArray[index]}.html`,
    })
  );
}

// output
const output = {
  filename: '[name].[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
  pathinfo: false,
  clean: true,
};

// optimization
const optimization = {
  moduleIds: 'deterministic',
  runtimeChunk: 'single',
  removeAvailableModules: true,
  removeEmptyChunks: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];

          return `npm.${packageName.replace('@', '')}`;
        },
      },
    },
  },
};

// resolve
const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer,
  plugins,
  output,
  optimization,
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg|webp)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve,
};
