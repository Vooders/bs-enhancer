const path = require('path')

module.exports = {
  entry: './ts/start.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'enhance.js'
  }
}
