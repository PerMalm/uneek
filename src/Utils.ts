
export function listen<A>(def: A, k: () => A): [A, string] {
  try {
    const res = k()
    return [res, '']
  } catch (e) {
    if (typeof e == 'string') {
      return [def, e]
    } else {
      return [def, e.toString()]
    }
  }
}

export const or = <A>(u: A | undefined, a: A) => u === undefined ? a : u

/** Returns a copy of the array with duplicates removed, via toString */
export function uniq<A>(xs: A[]): A[] {
  const seen = {} as Record<string, boolean>
  return xs.filter(x => {
    const s = x.toString()
    const duplicate = s in seen
    seen[s] = true
    return !duplicate
  })
}

export function record_forEach<K extends string, A>(x: Record<K, A>, k: (a: A, id: K) => void): void {
  (Object.keys(x) as K[]).forEach((id: K) => k(x[id], id))
}

export function record_create<K extends string, A>(ks: K[], f: (k: K) => A): Record<K, A> {
  const obj = {} as Record<K, A>
  ks.forEach(k => obj[k] = f(k))
  return obj
}

export function record_traverse<K extends string, A, B>(x: Record<K, A>, k: (a: A, id: K) => B, sort_keys: boolean=false): B[] {
  const ks = Object.keys(x) as K[]
  if (sort_keys) {
    ks.sort()
  }
  return ks.map((id: K) => k(x[id], id))
}

export function record_map<K extends string, A, B>(x: Record<K, A>, k: (a: A, id: K) => B): Record<K, B> {
  const out = {} as Record<K, B>
  record_forEach(x, (a, id) => out[id] = k(a, id))
  return out
}

export function record_filter<A>(x: Record<string, A>, k: (a: A, id: string) => boolean): Record<string, A> {
  const out = {} as Record<string, A>
  record_forEach(x, (a, id) => k(a, id) && (out[id] = a))
  return out
}

export function Arr<A>(xs: ArrayLike<A>): A[] {
  const out = [] as A[]
  for (let i = 0; i < xs.length; i++) {
    out.push(xs[i])
  }
  return out
}

export function succ(x: undefined | number): number {
  return x === undefined ? 1 : x + 1
}

/** Tokenizes text on whitespace removes all trailing whitespace  */
export function tokenize(s: string): string[] {
  return (s.match(/\s*\S+\s*/g) || []).map(x => x.trim())
}

export function zero(x: number | undefined): boolean {
  return x === undefined || x == 0
}

export function keysof(...objs: Record<string, any>[]) {
  return uniq(([] as string[]).concat(...objs.map(obj => Object.keys(obj))))
}

import { VNode } from "snabbdom/vnode"
import { Store } from "reactive-lens"
import { tag, s } from "snabbis"

export interface StoreSplice {
  selector: string,
  store: Store<any>
}

export const checked = (store: Store<boolean>): StoreSplice => ({selector: 'checked', store})
export const value = (store: Store<string>): StoreSplice => ({selector: 'value', store})

export function html(prefix='snabbis-unique-') {
  let next_unique = 0
  return function (snippets: TemplateStringsArray, ...syncs: (StoreSplice | string)[]): VNode {
    let innerHTML = ''
    const cbs = [] as (() => void)[]
    syncs.forEach((sync: StoreSplice | string, i) => {
      if (typeof sync == 'string') {
        innerHTML += snippets[i]
        innerHTML += sync
      } else {
        const id = prefix + ++next_unique
        const {store, selector} = sync
        innerHTML += snippets[i]
        innerHTML += ` id=${id} `
        cbs.push(() => window.requestAnimationFrame(() => {
          const elm = document.getElementById(id) as HTMLInputElement | null
          if (elm) {
            if ((elm as any)[selector] != store.get()) {
              (elm as any)[selector] = store.get()
            }
            store.ondiff((z: any, a: any) => z !== a && ((elm as any)[selector] = z))
            elm.onchange = () => store.set((elm as any)[selector])
            elm.oninput = () => store.set((elm as any)[selector])
          } else {
            // console.error(`Element not found: ${id}`)
          }
        }))
      }
    })
    if (snippets.length > syncs.length) {
      innerHTML += snippets[snippets.length - 1]
    }
    return tag('div',
      s.key(++next_unique),
      s.props({ innerHTML }),
      s.hook('init')(() => cbs.forEach(k => k())),
    )
  }
}

