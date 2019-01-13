import { DependencyManager } from './src/DependencyManager'
import { Units } from './src/Units'
import { Nav } from './src/Nav'

const dependencyManager = new DependencyManager()
const units = new Units()

dependencyManager.loadDependencies()
Nav.init()
units.createNavMenu()
units.createModals()
units.hideModelEquipment()
