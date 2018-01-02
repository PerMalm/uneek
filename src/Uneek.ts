import * as Utils from './Utils'

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
  return Utils.record_create(Utils.keysof(a, b), k => Pair(Utils.or(a[k], def_a), Utils.or(b[k], def_b)))
}

export type VectorPair = VectorOf<Pair<number, number>>
export const VectorPair = (a: Vector, b: Vector): VectorPair => VectorPairOf(a, b, 0, 0)

export type Status = 'A' | 'B' | 'Both'
export const Compare = (a: Vector, b: Vector) => ComparePairs(VectorPair(a, b))

export function ComparePairs(ab: VectorPair): StatusVector {
  return Utils.record_map(ab, ({a, b}) => a == 0 ? 'B' : b == 0 ? 'A' : 'Both')
}

// is this thing unique in a?
export const Unique = (a: Vector, b: Vector) => UniquePairs(VectorPair(a, b))
export function UniquePairs(ab: VectorPair): Record<string, boolean> {
  return Utils.record_map(ab, ({a, b}) => a > 0 && b == 0)
}

export function Vectorize(s: string): Vector {
  const v = {} as Vector
  Utils.tokenize(s).forEach(t => v[t] = Utils.succ(v[t]))
  return v
}

export function ParseXML(s: string): Document {
  const p = new DOMParser()
  const d = p.parseFromString(s, 'application/xml')
  const q_pe = d.querySelector('parsererror')
  if (q_pe) {
    const q_div = q_pe.querySelector('div')
    throw (q_div || q_pe).textContent
  }
  return d
}

export function FromXML(d: Document | string): Text {
  if (typeof d == 'string') {
    d = ParseXML(d)
  }
  const w = d.createTreeWalker(d)
  const r = {} as Text
  const bump = (k: string, t: string) => {
    r[k] = r[k] || {}
    r[k][t] = Utils.succ(r[k][t])
  }
  while (w.nextNode()) {
    const node = w.currentNode
    if (node.nodeType == 1) {
      const attrs = node.attributes
      const t = (node as any).tagName || '<?>'
      Array.from(attrs).map(attr => {
        bump(t + '.' + attr.name, attr.value)
      })
    } else if (node.nodeType == 3) {
      const k = ((node.parentNode && (node.parentNode as any).tagName) || '<?>')
      const text = node.textContent || ""
      Utils.tokenize(text).forEach(t => bump(k, t))
    }
  }
  return r
}

