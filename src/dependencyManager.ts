const config: DependencyManager.Config = require('../config/dependencies.json')
const body = document.getElementsByClassName('battlescribe')[1]

export class DependencyManager {
  loadDependencies () {
    console.log('loading dependencies...')
    config.js.forEach((script) => {
      const element = document.createElement('script')
      element.setAttribute('src', script.url)
      body.appendChild(element)
    })
  }
}

export namespace DependencyManager {
  export type ConfigEntry = {
    readonly name: string,
    readonly url: string
  }

  export type Config = {
    readonly js: ConfigEntry[]
    readonly css: ConfigEntry[]
  }
}