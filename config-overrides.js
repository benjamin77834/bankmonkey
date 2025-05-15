const webpack = require('webpack');

module.exports = function override(config) {
  // Agregar los fallbacks necesarios para Webpack 5
  config.resolve.fallback = {
    fs: false,
    process: require.resolve('process/browser'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    assert: require.resolve('assert'),
    zlib: require.resolve('browserify-zlib'),
    os: require.resolve('os-browserify'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url'),
    util: require.resolve('util'),
    path: require.resolve('path-browserify'),
  };

  // Asegurar que se agregue el plugin necesario para process
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};

