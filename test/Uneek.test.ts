import * as Uneek from '../src/Uneek'
import * as test from 'tape'

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
      bepa: false
    })
  assert.deepEqual(
    Uneek.Unique(B.word, A.word), {
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
      bepa: false
    })
  assert.deepEqual(
    Uneek.Unique(B, A), {
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


