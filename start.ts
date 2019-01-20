import { DependencyManager } from './src/DependencyManager'
import { Units } from './src/Units'
import { Nav } from './src/Nav'
import { Rules } from './src/Rules'

const dependencyManager = new DependencyManager()
const units = new Units()
const rules = new Rules()

dependencyManager.loadDependencies()
Nav.init()
units.createNavMenu()
units.createModals()
units.hideModelEquipment()
rules.buildModals()
