import * as Uneek from '../src/Uneek'
import * as test from 'tape'
import { JSDOM } from 'jsdom'

; (global as any)['DOMParser'] = new JSDOM(``).window.DOMParser

export const A = {
  word: {
    apa: 1,
    bepa: 2,
  },
  pos: {
    DT: 2,
    PN: 1,
  }
}

export const B = {
  word: {
    cepa: 1,
    bepa: 2,
  },
  pos: {
    DT: 2,
    PP: 1,
  }
}

test('Unique', assert => {
  assert.deepEqual(
    Uneek.Unique(A.word, B.word), {
      apa: true,
      bepa: false,
      cepa: false,
    })
  assert.deepEqual(
    Uneek.Unique(B.word, A.word), {
      apa: false,
      cepa: true,
      bepa: false
    })
  assert.deepEqual(
    Uneek.Compare(A.word, B.word), {
      apa: 'A',
      bepa: 'Both',
      cepa: 'B'
    })
  assert.end()
})

test('Vectorize', assert => {
  const A = Uneek.Vectorize('apa bepa bepa')
  const B = Uneek.Vectorize('bepa cepa bepa')
  assert.deepEqual(
    Uneek.Unique(A, B), {
      apa: true,
      bepa: false,
      cepa: false,
    })
  assert.deepEqual(
    Uneek.Unique(B, A), {
      apa: false,
      cepa: true,
      bepa: false
    })
  assert.deepEqual(
    Uneek.Compare(A, B), {
      apa: 'A',
      bepa: 'Both',
      cepa: 'B'
    })
  assert.end()
})

test('XML', assert => {
  const A = Uneek.FromXML(Uneek.ParseXML(`
    <root>
      <w pos="DT">En</w>
      <w pos="NN">båt</w>
    </root>
  `))
  const B = Uneek.FromXML(Uneek.ParseXML(`
    <root>
      <w pos="D">En</w>
      <w pos="NN">filmjölk</w>
    </root>
  `))
  assert.deepEqual(
    Uneek.VectorPair(A['w'], B['w']),
    {
      'En': {a: 1, b: 1},
      'båt': {a: 1, b: 0},
      'filmjölk': {a: 0, b: 1},
    }
  )
  assert.deepEqual(
    Uneek.VectorPair(A['w.pos'], B['w.pos']),
    {
      'DT': {a: 1, b: 0},
      'D': {a: 0, b: 1},
      'NN': {a: 1, b: 1},
    }
  )
  assert.end()
})
