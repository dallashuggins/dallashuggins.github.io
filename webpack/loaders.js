const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2, // postcss + sass = 2
    localIdentName: '[name]-[local]-[hash:base64:5]'
  }
}

module.exports = {
  reactSvg: {
    test: /\.svg$/,
    exclude: /node_modules/,
    loaders: [
      'babel-loader',
      {
        loader: 'react-svg-loader',
        query: {
          jsx: true
        }
      }
    ]
  },
  js: {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    // All optional newlines and whitespace will be omitted when generating code in compact mode:
    query: { compact: false }
  },
  imagesViaUrl: {
    test: /\.(png|jpe?g|gif)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=400000'
  },
  imagesViaFile: {
    test: /\.(png|jpe?g|gif)$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  },
  sass: {
    test: /\.sass$/,
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      cssLoader,
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true
        }
      }
    ]
  },
  scss: {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      cssLoader,
      'postcss-loader',
      'sass-loader'
    ]
  }
}
