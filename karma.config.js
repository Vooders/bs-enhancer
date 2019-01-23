module.exports = function (config) {
  const configuration = {
    singleRun: true,
    webpack: {
      node: {
        fs: 'empty'
      },
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
      optimization: {}
    },
    webpackServer: { noInfo: true },
    basePath: "",
    frameworks: ["mocha", "chai"],
    files: [ 
      './ts/test/TestConfiguration.js'
    ],
    preprocessors: {
      "./ts/test/TestConfiguration.js": ["webpack"],
      "ts/src/**/*.js": "coverage"
    },
    coverageReporter: {
      type : 'text-summary',
      dir : 'coverage/',
      includeAllSources : true
    },
    reporters: [
      "spec",
      "karmaHTML"
    ],
    client: {
      karmaHTML: {
        source: [
          {src:'./test/testData.html', tag:'index'},
        ]
      }
    },
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