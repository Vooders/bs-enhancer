const path = require("path")

const webpackTestConfig = {
  output: {
    path: path.resolve(__dirname, 'tests'),
    filename: 'tests.js'
  },
  node: {
    fs: 'empty'
  },
  mode: 'production'
}

const files = [ 
  './ts/test/TestConfiguration.js'
 ]

const preprocessors = {
  "./ts/test/TestConfiguration.js": ["webpack"]
}

const karmaWebpackConfig = Object.assign({}, webpackTestConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  },
  optimization: {},
  devtool: 'inline-source-map'
})
module.exports = function (config) {
  const configuration = {
    singleRun: true,
    webpack: karmaWebpackConfig,
    webpackServer: { noInfo: true },
    basePath: "",
    frameworks: ["mocha"],
    files,
    preprocessors,
    reporters: ["spec"],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: false,
      showSpecTiming: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      "ChromeHeadless",
      "FirefoxHeadless"
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: "Chrome",
        flags: ["--no-sandbox"]
      }
    },
    concurrency: Infinity
  }

  config.set(configuration)
}