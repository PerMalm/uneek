"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils = require("./Utils");
exports.Pair = (a, b) => ({ a, b });
function VectorPairOf(a, b, def_a, def_b) {
    return Utils.record_create(Utils.keysof(a, b), k => exports.Pair(Utils.or(a[k], def_a), Utils.or(b[k], def_b)));
}
exports.VectorPairOf = VectorPairOf;
exports.VectorPair = (a, b) => VectorPairOf(a, b, 0, 0);
exports.Compare = (a, b) => ComparePairs(exports.VectorPair(a, b));
function ComparePairs(ab) {
    return Utils.record_map(ab, ({ a, b }) => (a == 0 ? 'B' : b == 0 ? 'A' : 'Both'));
}
exports.ComparePairs = ComparePairs;
// is this thing unique in a?
exports.Unique = (a, b) => UniquePairs(exports.VectorPair(a, b));
function UniquePairs(ab) {
    return Utils.record_map(ab, ({ a, b }) => a > 0 && b == 0);
}
exports.UniquePairs = UniquePairs;
function Vectorize(s) {
    const v = {};
    Utils.tokenize(s).forEach(t => (v[t] = Utils.succ(v[t])));
    return v;
}
exports.Vectorize = Vectorize;
function ParseXML(s) {
    const p = new DOMParser();
    const d = p.parseFromString(s, 'application/xml');
    const q_pe = d.querySelector('parsererror');
    if (q_pe) {
        const q_div = q_pe.querySelector('div');
        throw (q_div || q_pe).textContent;
    }
    return d;
}
exports.ParseXML = ParseXML;
function FromXML(d) {
    if (typeof d == 'string') {
        d = ParseXML(d);
    }
    const r = {};
    const bump = (k, t) => {
        r[k] = r[k] || {};
        r[k][t] = Utils.succ(r[k][t]);
    };
    const bump2 = (struct, k, t) => {
        struct[k] = struct[k] || [];
        struct[k].push(t);
    };
    const sentenceparser = (s) => {
        const struct = {};
        Array.from(s.getElementsByTagName('*')).map(w => Array.from(w.attributes).map(x => bump2(struct, x.nodeName, x.value)));
        Object.keys(struct).map(key => bump('syn.shallow' + '.' + key, struct[key].join('-')));
    };
    Array.from(d.getElementsByTagName('sentence')).map(s => sentenceparser(s));
    const w = d.createTreeWalker(d);
    while (w.nextNode()) {
        const node = w.currentNode;
        if (node.nodeType == 1) {
            const attrs = node.attributes;
            const t = node.tagName || '<?>';
            Array.from(attrs).map(attr => {
                bump(t + '.' + attr.name, attr.value);
            });
        }
        else if (node.nodeType == 3) {
            const k = (node.parentNode && node.parentNode.tagName) || '<?>';
            const text = node.textContent || '';
            Utils.tokenize(text).forEach(t => bump(k, t));
        }
    }
    return r;
}
exports.FromXML = FromXML;
exports.flat = (v) => Utils.record_traverse(v, ({ a, b }, word) => ({ a, b, word })).sort((l, r) => r.a + r.b - (l.a + l.b));
exports.full = (a, b) => Utils.flatten(Utils.keysof(a, b)
    .sort()
    .map(key => exports.flat(exports.VectorPair(a[key] || {}, b[key] || {})).map(v => (Object.assign({ key }, v)))));
function table(rs, order) {
    return [order].concat(rs.map(r => order.map((k) => r[k])));
}
exports.table = table;
const CSV = require('comma-separated-values');
exports.csv = (xss) => new CSV(xss).encode();
exports.full_export = (a, b) => exports.csv(table(exports.full(a, b), ['key', 'word', 'a', 'b']));
exports.small_export = (v) => exports.csv(table(exports.flat(v), ['word', 'a', 'b']));
