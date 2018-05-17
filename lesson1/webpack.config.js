



let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = glob.sync('./src/view/**/script.js').reduce((prev, curr) => {
  prev[curr.slice(11, -10)] = curr;
  return prev;
}, {});

const htmls = glob.sync('./src/view/**/*.html').map(item => {
  return new HtmlWebpackPlugin({
    filename: `${item.slice(6)}`,
    template: item,
    inject: true,
    chunks: ['commons', `${item.slice(11, -11)}`],
  })
});

const config = {
  mode: 'development',  
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/athena/'
  },
  module: {
    rules: [
      {
        test: /.\js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      }, {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ],
        include: path.resolve(__dirname, 'src')
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          test: /\.js$/,
          chunks: 'all',
          minChunks: 1,
          enforce: true
        },
      }
    },
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.SplitChunksPlugin({
    //   chunks: "all",
    //   name: true,
    // })
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/view/index/index.html'),
    //   inject: true,
    //   chunks: ['index']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'login.html',
    //   template: path.resolve(__dirname, './src/view/login/index.html'),
    //   inject: true,
    //   chunks: ['login']
      
    // })
  ].concat(htmls),
  devServer: {
    hot: true,
    port: 8090,
  }
}
console.log(config, 'config');
module.exports = config