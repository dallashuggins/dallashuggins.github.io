const path = require('path')

module.exports = {
  modules: [
    'src',
    'node_modules'
  ],
  alias: {
    // so we can @import '~styles/base.sass':
    'styles': path.resolve(__dirname, '../src/styles/')
  },
  extensions: ['.js', '.jsx', '.sass', '.svg', '.png']
}
