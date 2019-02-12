import 'mocha'
import * as chai from 'chai'
import 'verify-it'

chai.should()

const testsContext = require.context("./unit", true, /.*Spec.js$/)
testsContext.keys().forEach(testsContext)
