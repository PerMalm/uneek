import * as App from "./App"
import * as snabbis from "snabbis"
import './index.css'

const root = document.getElementsByTagName('body')[0] as HTMLElement
const reattach = snabbis.attach(root, App.init, App.App)

declare const module: any;
declare const require: any;

if (module.hot) {
  module.hot.accept(() => {
    try {
      const NextApp = require('./App.ts')
      reattach(NextApp.App)
    } catch (e) {
      console.error(e)
    }
  })
}
