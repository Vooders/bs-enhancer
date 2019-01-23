"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rules_1 = require("../../src/Rules");
describe('Rules', () => {
    verify.it('should get all rules from the document', () => {
        const rules = new Rules_1.Rules();
        rules.logRules();
    });
});
//# sourceMappingURL=RulesSpec.js.map