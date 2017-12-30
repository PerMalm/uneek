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

  const count =
    (w: Uneek.VectorPair) =>
    tag('.whitebox.w33.scroll',
      Utils.record_traverse(w, ({a, b}, k) => ({a, b, k}))
        .sort((l, r) => (r.a + r.b) - (l.a + l.b))
        .map(({a, b, k}) =>
          tag('.rows',
            tag('span.w20.r', a > 0 && a),
            tag('span.w60.c', k, a > 0 && b > 0 && tag('span.small', ` (${a + b})`)),
            tag('span.w20.l', b > 0 && b))))

  return tag(
    '.rows.w100.h100.marginalized',
    tag('.w20',
      tag('.cols.h100.centered.vcentered',
        s.textarea(a, undefined, undefined, s.classed('textarea')),
        a_err && tag('.error', a_err)
      )),
    tag('.w60.cols.h100',
      tag('.rows.centered.marginalized',
        keys.map(
          k =>
            s.button(
              () => store.at('key').set(k),
              k,
              s.attrs({disabled: k === store.at('key').get()})))),
      tag('.rows.h100.marginalized',
        count(only((a, b) => b == 0)),
        count(only((a, b) => a > 0 && b > 0)),
        count(only((a, b) => a == 0)),
      )
    ),
    tag('.w20',
      tag('.cols.h100.centered.vcentered',
        s.textarea(b, undefined, undefined, s.classed('textarea')),
        b_err && tag('.error', b_err)
      )),
  )
}
