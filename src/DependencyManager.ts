const config: DependencyManager.Config = require('../config/dependencies.json')
const body: Element = document.getElementsByClassName('battlescribe')[1]
const head  = document.getElementsByTagName('head')[0]

export class DependencyManager {
  loadDependencies (): void {
    config.css.forEach((script) => {
      const css  = document.createElement('link')
      css.setAttribute('rel', 'stylesheet')
      css.setAttribute('type', 'text/css')
      css.setAttribute('href', script.url)
      css.setAttribute('media', 'all')
      head.appendChild(css)
    })

    let promise:any = Promise.resolve()
    const intervalBetweenScriptLoads = 200
    config.js.forEach((script) => {
      promise = promise.then(function () {
        const element = document.createElement('script')
        element.setAttribute('src', script.url)
        body.appendChild(element)
        return new Promise(function (resolve) {
          setTimeout(resolve, intervalBetweenScriptLoads)
        })
      })
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