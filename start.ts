import { DependencyManager } from './src/DependencyManager'
import { Units } from './src/Units'
import { Nav } from './src/Nav'
import { Rules } from './src/Rules'

const dependencyManager = new DependencyManager()
dependencyManager.loadDependencies()

Nav.init()

const units = new Units()
units.createNavMenu()
units.createModals()
units.hideModelEquipment()

const rules = new Rules()
rules.buildModals()
