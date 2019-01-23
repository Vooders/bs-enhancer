"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("verify-it");
const chai = require("chai");
chai.should();
const testsContext = require.context("./unit", true, /.*Spec.js/);
testsContext.keys().forEach(testsContext);
//# sourceMappingURL=TestConfiguration.js.map