var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config');
webpackConfig = webpackConfig('development', {mode: 'development'});

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/*.html',
      'dist/three.min.js',
      'test/**/*spec.js'
    ],
    plugins: [
      'karma-html2js-preprocessor',
      webpack,
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    preprocessors: {
      'dist/*.html': ['html2js'],
      'src/**/*spec.js': ['webpack'],
      'src/**/*.js': ['webpack'],
      'tests.webpack.js': ['webpack'],
      'test/**/*spec.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    singleRun: true,
    colors: true,
    autowatch: true
  });
};
