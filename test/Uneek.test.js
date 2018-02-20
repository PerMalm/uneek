"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Uneek = require("../src/Uneek");
const test = require("tape");
const jsdom_1 = require("jsdom");
global['DOMParser'] = new jsdom_1.JSDOM(``).window.DOMParser;
exports.A = {
    word: {
        apa: 1,
        bepa: 2,
    },
    pos: {
        DT: 2,
        PN: 1,
    },
};
exports.B = {
    word: {
        cepa: 1,
        bepa: 2,
    },
    pos: {
        DT: 2,
        PP: 1,
    },
};
test('Unique', assert => {
    assert.deepEqual(Uneek.Unique(exports.A.word, exports.B.word), {
        apa: true,
        bepa: false,
        cepa: false,
    });
    assert.deepEqual(Uneek.Unique(exports.B.word, exports.A.word), {
        apa: false,
        cepa: true,
        bepa: false,
    });
    assert.deepEqual(Uneek.Compare(exports.A.word, exports.B.word), {
        apa: 'A',
        bepa: 'Both',
        cepa: 'B',
    });
    assert.end();
});
test('Vectorize', assert => {
    const A = Uneek.Vectorize('apa bepa bepa');
    const B = Uneek.Vectorize('bepa cepa bepa');
    assert.deepEqual(Uneek.Unique(A, B), {
        apa: true,
        bepa: false,
        cepa: false,
    });
    assert.deepEqual(Uneek.Unique(B, A), {
        apa: false,
        cepa: true,
        bepa: false,
    });
    assert.deepEqual(Uneek.Compare(A, B), {
        apa: 'A',
        bepa: 'Both',
        cepa: 'B',
    });
    assert.end();
});
test('XML', assert => {
    const A = Uneek.FromXML(`
    <root>
      <w pos="DT">En</w>
      <w pos="NN">båt</w>
    </root>
  `);
    const B = Uneek.FromXML(`
    <root>
      <w pos="D">En</w>
      <w pos="NN">liter filmjölk</w>
    </root>
  `);
    assert.deepEqual(Uneek.VectorPair(A['w'], B['w']), {
        En: { a: 1, b: 1 },
        båt: { a: 1, b: 0 },
        liter: { a: 0, b: 1 },
        filmjölk: { a: 0, b: 1 },
    });
    assert.deepEqual(Uneek.VectorPair(A['w.pos'], B['w.pos']), {
        DT: { a: 1, b: 0 },
        D: { a: 0, b: 1 },
        NN: { a: 1, b: 1 },
    });
    assert.end();
});
test('export', assert => {
    const A = Uneek.FromXML(`
    <root>
      <w pos="DT">En</w>
      <w pos="NN">båt</w>
    </root>
  `);
    const B = Uneek.FromXML(`
    <root>
      <w pos="D">En</w>
      <w pos="NN">liter filmjölk</w>
    </root>
  `);
    assert.deepEqual(Uneek.full_export(A, B), [
        '"key","word","a","b"',
        '"w","En","1","1"',
        '"w","båt","1","0"',
        '"w","liter","0","1"',
        '"w","filmjölk","0","1"',
        '"w.pos","NN","1","1"',
        '"w.pos","DT","1","0"',
        '"w.pos","D","0","1"',
    ].join('\r\n'));
    assert.deepEqual(Uneek.small_export(Uneek.VectorPair(A.w, B.w)), [
        '"word","a","b"',
        '"En","1","1"',
        '"båt","1","0"',
        '"liter","0","1"',
        '"filmjölk","0","1"',
    ].join('\r\n'));
    assert.deepEqual(Uneek.small_export(Uneek.VectorPair(A['w.pos'], B['w.pos'])), ['"word","a","b"', '"NN","1","1"', '"DT","1","0"', '"D","0","1"'].join('\r\n'));
    assert.end();
});
