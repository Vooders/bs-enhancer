import 'mocha'
import 'verify-it'
import * as chai from 'chai'

chai.should()

const testsContext = require.context("./unit", true, /.*Spec.js/)
testsContext.keys().forEach(testsContext)
