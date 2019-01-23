const mainWebpackConfig = require("./webpack.config.js")
const path = require("path")

const testConfigPath = "./ts/test/TestConfiguration.js"

const files = [testConfigPath]

const preprocessors = {
  testConfigPath: ["webpack"]
}

const karmaWebpackConfig = Object.assign({}, mainWebpackConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /test/,
        loaders: ["babel-loader"]
      }
    ]
  },
  optimization: {},
  devtool: 'inline-source-map'
})

module.exports = function karmaConfig(config) {
  const configuration = {
    singleRun: true,
    webpack: karmaWebpackConfig,
    webpackServer: { noInfo: true },
    basePath: "",
    frameworks: ["mocha"],
    files,
    preprocessors,
    reporters: ["spec"], // This line is extra important, it enabled the green checkmarks in the specs
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // print information about failed tests
      suppressPassed: false, //  print information about passed tests
      suppressSkipped: false, // print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["ChromeHeadless"],
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