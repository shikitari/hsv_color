const path = require('path');
const webpack = require('webpack');
const THREE = require('three');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const isDevMode = (mode === 'development');
  const plugins = (isDevMode)? [new webpack.HotModuleReplacementPlugin()] : [];

  const entry = {
    'index': [path.resolve(__dirname, 'src/index.jsx')]
  };
  if (isDevMode) {
    entry['index'].unshift(path.resolve(__dirname, 'src/injectDebugCode.js'));
  }
  
  console.log(`mode: ${mode}`);

  return {
    mode: mode,
    devtool: 'inline-source-map',
    entry: entry,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './dist',
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      publicPath: '/',
      hot: true
    },
    plugins: plugins,
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            babelrc: false,
            presets: ["es2015", "react"],
            plugins: ["babel-plugin-transform-object-rest-spread", "transform-async-to-generator", "transform-decorators-legacy", "transform-class-properties", ["transform-runtime", {
              "polyfill": false,
              "regenerator": true
            }]]
          },
        },
        {
          test: /\.(glsl|frag|vert)$/,
          loader: 'raw-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: isDevMode,
                importLoaders: 2
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevMode,
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.jsx'],
    }
  }
}