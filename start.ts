import { DependencyManager } from './src/DependencyManager'
import { Units } from './src/Units'
import { Rules } from './src/Rules'

const dependencyManager = new DependencyManager()
const units = new Units(document)
const rules = new Rules(document)
rules.create()

dependencyManager.loadDependencies()
units.createNavMenu()
units.createModals()
units.createDeathButtons()
units.hideModelEquipment()
