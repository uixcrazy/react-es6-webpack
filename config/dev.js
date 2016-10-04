// var WebpackDevServer = require("webpack-dev-server");
// var webpack = require("webpack");

/**
 * docs: http://webpack.github.io/docs/webpack-dev-server.html
 */

import webpack from 'webpack';
import express from 'express';
import path from 'path';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack/webpack.config.dev';

const devPort = 9009;
const router = express.Router();
const pluginDefine = new webpack.DefinePlugin({
  // for compatiable with current source code.
  // Those needs to access window and global variable.
  window: 'window',
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
  },
});
config.plugins.push(pluginDefine);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: 'demo',
  // contentBase: "/path/to/directory",
  // or: contentBase: "http://localhost/",

  hot: true,
  inline: true, //???
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want to enable gzip compression for assets
  // compress: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  // proxy: {
  //   "*": "http://localhost:9090"
  // },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});

router.get('/demo', (req, res) => {
  res.send('Hello World!');
});
/*
 * config Twig file
 */
// router.get('/hhd/:page_type', (req, res) => {
//   // noCachedResult(res);
//   const useDeployedVersion = req.query.uselive;
//   const template = Twig.twig({ data: fs.readFileSync(path.join(__dirname, '../demo/hhd.twig'), 'utf-8') });
//   res.send(template.render({
//     page_type: req.params.page_type,
//     use_deployed_version: useDeployedVersion,
//   }));
// });

router.get('/:demo_page', function(req, res) {
  res.sendFile(path.join(__dirname, `../app/${req.params.demo_page}/index.html`), 'utf-8');
});

server.use(router);
server.listen(devPort, "localhost", () => {
  console.log('Server start on port: ${devPort}');
});
// server.close();