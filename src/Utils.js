"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listen(def, k) {
    try {
        const res = k();
        return [res, ''];
    }
    catch (e) {
        if (typeof e == 'string') {
            return [def, e];
        }
        else {
            return [def, e.toString()];
        }
    }
}
exports.listen = listen;
exports.or = (u, a) => (u === undefined ? a : u);
/** Returns a copy of the array with duplicates removed, via toString */
function uniq(xs) {
    const seen = {};
    return xs.filter(x => {
        const s = x.toString();
        const duplicate = s in seen;
        seen[s] = true;
        return !duplicate;
    });
}
exports.uniq = uniq;
function record_forEach(x, k) {
    ;
    Object.keys(x).forEach((id) => k(x[id], id));
}
exports.record_forEach = record_forEach;
function record_create(ks, f) {
    const obj = {};
    ks.forEach(k => (obj[k] = f(k)));
    return obj;
}
exports.record_create = record_create;
function record_traverse(x, k, sort_keys = false) {
    const ks = Object.keys(x);
    if (sort_keys) {
        ks.sort();
    }
    return ks.map((id) => k(x[id], id));
}
exports.record_traverse = record_traverse;
function record_map(x, k) {
    const out = {};
    record_forEach(x, (a, id) => (out[id] = k(a, id)));
    return out;
}
exports.record_map = record_map;
function record_filter(x, k) {
    const out = {};
    record_forEach(x, (a, id) => k(a, id) && (out[id] = a));
    return out;
}
exports.record_filter = record_filter;
function succ(x) {
    return x === undefined ? 1 : x + 1;
}
exports.succ = succ;
/** Tokenizes text on whitespace removes all trailing whitespace  */
function tokenize(s) {
    return (s.match(/\s*\S+\s*/g) || []).map(x => x.trim());
}
exports.tokenize = tokenize;
function zero(x) {
    return x === undefined || x == 0;
}
exports.zero = zero;
function keysof(...objs) {
    return uniq([].concat(...objs.map(obj => Object.keys(obj))));
}
exports.keysof = keysof;
function flatten(xs) {
    return [].concat(...xs);
}
exports.flatten = flatten;
function download(s, filename, mimetype = 'text/plain') {
    const a = document.createElement('a');
    a.setAttribute('href', `data:${mimetype};charset=utf-8,${encodeURIComponent(s)}`);
    a.setAttribute('download', filename);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
exports.download = download;
