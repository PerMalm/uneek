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

export const or = <A>(u: A | undefined, a: A) => (u === undefined ? a : u)

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

export function record_forEach<K extends string, A>(
  x: Record<K, A>,
  k: (a: A, id: K) => void
): void {
  ;(Object.keys(x) as K[]).forEach((id: K) => k(x[id], id))
}

export function record_create<K extends string, A>(ks: K[], f: (k: K) => A): Record<K, A> {
  const obj = {} as Record<K, A>
  ks.forEach(k => (obj[k] = f(k)))
  return obj
}

export function record_traverse<K extends string, A, B>(
  x: Record<K, A>,
  k: (a: A, id: K) => B,
  sort_keys: boolean = false
): B[] {
  const ks = Object.keys(x) as K[]
  if (sort_keys) {
    ks.sort()
  }
  return ks.map((id: K) => k(x[id], id))
}

export function record_map<K extends string, A, B>(
  x: Record<K, A>,
  k: (a: A, id: K) => B
): Record<K, B> {
  const out = {} as Record<K, B>
  record_forEach(x, (a, id) => (out[id] = k(a, id)))
  return out
}

export function record_filter<A>(
  x: Record<string, A>,
  k: (a: A, id: string) => boolean
): Record<string, A> {
  const out = {} as Record<string, A>
  record_forEach(x, (a, id) => k(a, id) && (out[id] = a))
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

export function flatten<A>(xs: A[][]): A[] {
  return ([] as A[]).concat(...xs)
}

export function download(s: string, filename: string, mimetype = 'text/plain') {
  const a = document.createElement('a')
  a.setAttribute('href', `data:${mimetype};charset=utf-8,${encodeURIComponent(s)}`)
  a.setAttribute('download', filename)
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
