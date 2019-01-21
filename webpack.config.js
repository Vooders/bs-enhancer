const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'ts', 'start.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'enhance.js'
  },
  mode: 'production'
}
