export type Text = Record<string, Vector>

export type VectorOf<A> = Record<string, A>
export type Vector = VectorOf<number>

export type StatusVector = VectorOf<Status>

export interface Pair<A, B> {
  a: A,
  b: B
}

export const Pair = <A, B>(a: A, b: B) => ({a, b})

export function VectorPairOf<A, B>(a: VectorOf<A>, b: VectorOf<B>, def_a: A, def_b: B): VectorOf<Pair<A, B>> {
  return record_create(keysof(a, b), k => Pair(or(a[k], def_a), or(b[k], def_b)))
}

export type VectorPair = VectorOf<Pair<number, number>>
export const VectorPair = (a: Vector, b: Vector): VectorPair => VectorPairOf(a, b, 0, 0)

export type Status = 'A' | 'B' | 'Both'
export const Compare = (a: Vector, b: Vector) => ComparePairs(VectorPair(a, b))

export function ComparePairs(ab: VectorPair): StatusVector {
  return record_map(ab, ({a, b}) => a == 0 ? 'B' : b == 0 ? 'A' : 'Both')
}

// is this thing unique in a?
export const Unique = (a: Vector, b: Vector) => UniquePairs(VectorPair(a, b))
export function UniquePairs(ab: VectorPair): Record<string, boolean> {
  return record_map(ab, ({a, b}) => a > 0 && b == 0)
}

export function zero(x: number | undefined): boolean {
  return x === undefined || x == 0
}

export function keysof(...objs: Record<string, any>[]) {
  return uniq(([] as string[]).concat(...objs.map(obj => Object.keys(obj))))
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

/** Tokenizes text on whitespace removes all trailing whitespace  */
export function tokenize(s: string): string[] {
  return (s.match(/\s*\S+\s*/g) || []).map(x => x.trim())
}

export function Vectorize(s: string): Vector {
  const v = {} as Vector
  tokenize(s).forEach(t => v[t] = succ(v[t]))
  return v
}

export function succ(x: undefined | number): number {
  return x === undefined ? 1 : x + 1
}

