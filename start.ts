import { DependencyManager } from './src/dependencyManager'

console.log('starting app')
// const body = document.getElementsByClassName('battlescribe')[1]
// const head  = document.getElementsByTagName('head')[0]

const dependencyManager = new DependencyManager()
dependencyManager.loadDependencies()

