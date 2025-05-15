const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          process: require.resolve("process/browser.js"),
          path: require.resolve("path-browserify"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
fs: false,
 os: require.resolve("os-browserify/browser"),
constants: require.resolve("constants-browserify"),
 process: require.resolve("process/browser"),
        },
        alias: {
          ...(webpackConfig.resolve.alias || {}),
          'process/browser': require.resolve('process/browser.js'),
        },
      };

      webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      return webpackConfig;
    },
  },
};

