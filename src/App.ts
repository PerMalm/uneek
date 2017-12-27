import { tag, s, TagData } from "snabbis"
import { tags } from "snabbis"
const {div, span, h1} = tags
import { Store, Lens, Omit } from "reactive-lens"
import { VNode } from "snabbdom/vnode"
import * as Model from "./Model"
import { State } from "./Model"
import * as Uneek from './Uneek'

export {Model}

export const show = (s: any) => JSON.stringify(s, undefined, 2)

export const App = (store: Store<State>) => {
  const global = window as any
  global.store = store
  global.reset = () => store.set(Model.init)
  store.storage_connect('uneek')
  store.on(x => console.log(JSON.stringify(x, undefined, 2)))
  return () => View(store)
}

export const View = (store: Store<State>): VNode => {
  const a = store.at('a')
  const b = store.at('b')
  const result = store.at('status_vector')
  return div(
    s.css({display: 'flex'}),
    s.textarea(a),
    tags.pre(show(Uneek.Compare(Uneek.Vectorize(a.get()), Uneek.Vectorize(b.get())))),
    s.textarea(b))
}
