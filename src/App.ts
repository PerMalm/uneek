import * as Uneek from './Uneek'
import * as Utils from './Utils'

import { VNode } from "snabbdom/vnode"
import { Store, Lens, Omit } from "reactive-lens"
import { tags, tag, s, TagData } from "snabbis"
const {div, span, h1} = tags

export interface State {
  readonly a: string,
  readonly b: string,
  readonly key: string | '',
}

export const init: State = {
  a: '',
  b: '',
  key: '',
}

export const show = (s: any) => JSON.stringify(s, undefined, 2)

export const App = (store: Store<State>) => {
  const global = window as any
  global.store = store
  global.reset = () => store.set(init)
  store.storage_connect('uneek')
  store.on(x => console.log(JSON.stringify(x, undefined, 2)))
  return () => View(store)
}

export const expr = <A>(k: () => A) => k()

export const View = (store: Store<State>): VNode => {
  const a = store.at('a')
  const b = store.at('b')
  const [A, a_err] = Utils.listen({}, () => Uneek.FromXML(`<text>${a.get()}</text>`))
  const [B, b_err] = Utils.listen({}, () => Uneek.FromXML(`<text>${b.get()}</text>`))
  const keys = Utils.keysof(A, B)
  const result = expr(() => {
    const key = store.at('key').get()
    if (keys.some(k => k == key)) {
      return Uneek.VectorPair(A[key] || {}, B[key] || {})
    } else {
      return {}
    }
  })
  const only =
    (p: (a: number, b: number) => boolean) =>
    Utils.record_filter(result, ({a, b}) => p(a,b))
  return tag(
    '.rows.w100.marginalized',
    tag('.w20',
      tag('.cols',
        s.textarea(a, undefined, undefined, s.classed('textarea')),
        a_err && tag('.error', a_err)
      )),
    tag('.w60.cols',
      tag('.rows.centered.marginalized', keys.map(k => s.button(() => store.at('key').set(k), k))),
      tag('.rows.marginalized',
        tag('pre.whitebox.w33', show(only((a, b) => b == 0))),
        tag('pre.whitebox.w33', show(only((a, b) => a > 0 && b > 0))),
        tag('pre.whitebox.w33', show(only((a, b) => a == 0))),
      )
    ),
    tag('.w20',
      tag('.cols',
        s.textarea(b, undefined, undefined, s.classed('textarea')),
        b_err && tag('.error', b_err)
      )),
  )
}
