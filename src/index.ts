import * as App from "./App"
import * as snabbis from "snabbis"

const root = document.getElementsByTagName('body')[0] as HTMLElement
const reattach = snabbis.attach(root, App.Model.init, App.App)

declare const module: any;
declare const require: any;

if (module.hot) {
  module.hot.accept('./App.ts', (_: any) => {
    try {
      const NextApp = require('./App.ts')
      reattach(NextApp.App)
    } catch (e) {
      console.error(e)
    }
  })
}
