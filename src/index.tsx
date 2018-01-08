import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import './index.css'

import * as App from './App'
import {attach} from 'reactive-lens'
import {render} from 'react-dom'

const root = document.getElementById('root') as HTMLElement
const reattach = attach(vn => render(vn, root), App.init, App.App)

declare const module: any
declare const require: any

if (module.hot) {
  module.hot.accept(() => {
    try {
      reattach(require('./App.tsx').App)
    } catch (e) {
      console.error(e)
    }
  })
}
