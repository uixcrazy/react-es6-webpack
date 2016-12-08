
import webpack from 'webpack';
import path from 'path';
import { DEV_PORT, HOST_NAME } from '../const.js';

export default {
  devtool: 'source-map',
  entry: {
    demo01: ['./app/demo01/app.js', 'webpack/hot/dev-server'],
    'demo-context': ['./app/demo-context/app.js', 'webpack/hot/dev-server'],
    'simple-tabs': ['./app/simple-tabs/app.js', 'webpack/hot/dev-server'],
    collapse: ['./app/collapse/app.js', 'webpack/hot/dev-server'],
    accordion: ['./app/accordion/app.js', 'webpack/hot/dev-server'],
    dropdown: ['./app/dropdown/app.js', 'webpack/hot/dev-server'],
    'react-collapse': ['./app/react-collapse/app.js', 'webpack/hot/dev-server'],
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    publicPath: `http://${HOST_NAME}:${DEV_PORT}/assets/`,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap',
      },
      {
        test: /\.scss$/,
        // loaders: ["style", "css", "sass"] // compile to <style> tag
        loaders: ["style", "css?sourceMap", "sass?sourceMap"],
      },
      {
        test: /\.(png|jpg|svg|gif|eot|woff|ttf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|ext-lib)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          // presets: ['es2015']
          plugins: ['transform-runtime'],
        }
      },

      // {
      //   test: /\.less$/,
      //   loader: 'style!css?sourceMap!less?sourceMap',
      // },
      // {
      //   test: /ext-lib[\\\/].+\.js$/,
      //   loader: 'imports?require=>false,module=>false,define=>false,exports=>undefined',
      // },
    ],
    // noParse: [
    //   /ext-lib[\\\/].+\.js/i,
    // ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  profile: true,
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    alias: {
      animate: path.join(__dirname, '../../node_modules/animate.css/source'),
      normalize: path.join(__dirname, '../../node_modules/normalize.css')
    }
  },
};
