"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DependencyManager_1 = require("./src/DependencyManager");
const Units_1 = require("./src/Units");
const Nav_1 = require("./src/Nav");
const Rules_1 = require("./src/Rules");
const dependencyManager = new DependencyManager_1.DependencyManager();
dependencyManager.loadDependencies();
Nav_1.Nav.init();
const units = new Units_1.Units();
units.createNavMenu();
units.createModals();
units.hideModelEquipment();
const rules = new Rules_1.Rules();
rules.buildModals();
//# sourceMappingURL=start.js.map