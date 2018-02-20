"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Uneek = require("./Uneek");
const Utils = require("./Utils");
const React = require("react");
const reactive_lens_1 = require("reactive-lens");
const logo = require('./images/nerlog.svg');
const center = require('./images/uneekCenter.svg');
const logotop = require('./images/slimlog.svg');
// dokumentation: tag(tagnamn.klass.klass..., attribut, namn)
//const doc = require('src/images/latextemplates.pdf')
// TODO fixa buggen!!
const doc = 'images/latextempates.pdf';
exports.Input = (store) => (React.createElement("input", { value: store.get(), onChange: (e) => store.set(e.target.value) }));
exports.Textarea = (_a) => {
    var { store } = _a, props = __rest(_a, ["store"]);
    return (React.createElement("textarea", Object.assign({}, props, { value: store.get(), onChange: (e) => store.set(e.target.value) })));
};
exports.Checkbox = (_a) => {
    var { store } = _a, props = __rest(_a, ["store"]);
    return (React.createElement("input", Object.assign({}, props, { type: "checkbox", ref: input => {
            if (input) {
                input.checked = store.get();
                store.ondiff(b => (input.checked = b));
                input.onchange = () => store.set(input.checked);
            }
        } })));
};
exports.Radio = (_a) => {
    var { store } = _a, props = __rest(_a, ["store"]);
    return (React.createElement("input", Object.assign({ type: "radio" }, props, { ref: input => {
            if (input) {
                input.checked = store.get();
                store.ondiff(b => (input.checked = b));
                input.onchange = () => store.set(input.checked);
            }
        } })));
};
exports.init = {
    a: '',
    b: '',
    key: '',
    show_intersection: true,
    show_uniqueness: true,
    show_syntax: false,
    location: '',
    xml_input: true,
};
exports.placeholder = {
    a: 'Insert File A here, or use the button below to upload from your device.',
    b: 'Insert File B here, or use the button below to upload from your device.',
};
exports.show = (s) => JSON.stringify(s, undefined, 2);
function expr(k) {
    return k();
}
exports.expr = expr;
exports.App = (store) => {
    const global = window;
    global.store = store;
    global.reset = () => store.set(exports.init);
    store.storage_connect('uneek');
    store.at('xml_input').ondiff(b => {
        if (!b && store.get().key != 'text') {
            store.update({ key: 'text' });
        }
    });
    store.at('location').location_connect(s => '#' + s, s => s.slice(1));
    const routes = {
        links: (React.createElement("div", { className: 'whitebox container' },
            React.createElement("h2", null, "Useful Links"),
            React.createElement("h3", null, "Automatic Annotation Tools"),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "https://spraakbanken.gu.se/sparv" }, "Sparv")),
                React.createElement("dd", null, "Sparv is Spr\u00E5kbanken\u2019s corpus annotation pipeline infrastructure. The easiest way to use the pipeline is from its web interface with a plain text document. The pipeline uses in-house and external tools on the text to segment it into sentences and paragraphs, tokenise, tag parts-of-speech, look up in dictionaries and analyse compounds. The pipeline can also be run using a web API with XML results, and it is run locally at Spr\u00E5kbanken to prepare the documents in Korp, Spr\u00E5kbanken's corpus search tool. While the most sophisticated support is for modern Swedish, the pipeline supports 15 languages.")),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "http://stp.lingfil.uu.se/swegram/" }, "SWEGRAM")),
                React.createElement("dd", null, "SWEGRAM is a web-based tool for the automatic linguistic annotation and quantitative analysis of Swedish text, enabling researchers in the humanities and social sciences to annotate their own text and produce statistics on linguistic and other text-related features on the basis of this annotation. The tool allows users to upload one or several documents, which are automatically fed into a pipeline of tools for tokenization and sentence segmentation, spell checking, part-of-speech tagging and morpho-syntactic analysis as well as dependency parsing for syntactic annotation of sentences. The analyzer provides statistics on the number of tokens, words and sentences, the number of parts of speech (PoS), readability measures, the average length of various units, and frequency lists of tokens, lemmas, PoS, and spelling errors. SWEGRAM allows users to create their own corpus or compare texts on various linguistic levels.")),
            React.createElement("h3", null, "Corpora and Concordance Tools"),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "https://spraakbanken.gu.se/korp" }, "Korp")),
                React.createElement("dd", null, "Korp is Spr\u00E5kbanken's corpus tool which among other things lets you view concordances in a vast amount of corpora (mostly Swedish).")),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "https://corpus.byu.edu/coca/" }, "The Corpus of Contemporary American English")),
                React.createElement("dd", null, "The Corpus of Contemporary American English (COCA) is the largest freely-available corpus of English, and the only large and balanced corpus of American English. \t\t\t\t   \t\t  ")),
            React.createElement("h3", null, "Grammatical Frameworks"),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "http://universaldependencies.org/" }, "Universal Dependencies")),
                React.createElement("dd", null, "Universal Dependencies (UD) is a framework for cross-linguistically consistent grammatical annotation and an open community effort with over 200 contributors producing more than 100 treebanks in over 60 languages.")),
            React.createElement("h3", null, "Lexical Resources"),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "https://framenet.icsi.berkeley.edu/fndrupal/" }, "FrameNet")),
                React.createElement("dd", null, "The FrameNet project is building a lexical database of English that is both human- and machine-readable, based on annotating examples of how words are used in actual texts. From the student's point of view, it is a dictionary of more than 13,000 word senses, most of them with annotated examples that show the meaning and usage. For the researcher in Natural Language Processing, the more than 200,000 manually annotated sentences linked to more than 1,200 semantic frames provide a unique training dataset for semantic role labeling, used in applications such as information extraction, machine translation, event recognition, sentiment analysis, etc.")),
            React.createElement("dl", null,
                React.createElement("dt", null,
                    React.createElement("a", { href: "https://spraakbanken.gu.se/karp" }, "Karp")),
                React.createElement("dd", null, "Karp is an open lexical infrastructure and a web based tool for searching, exploring and developing lexical resources. Spr\u00E5kbanken currently hosts a number of lexicons (mostly Swedish) in Karp and on-going work aims at broadening the type of resources that can be developed in the system. Karp also hosts the Swedish FrameNet and the Swedish Constructicon.")))),
        news: (React.createElement("div", { className: 'whitebox container' },
            React.createElement("h2", null, "Launchday!"),
            "The first version of Uneek is now up and running. In a nutshell, Uneek is a program that does what linguists often do: (i) look for differences or similarities between two texts, (ii) sort these out, (iii) and summarize them. If you experience technical problems, create an issue at ",
            React.createElement("a", { href: "https://github.com/PerMalm/uneek/issues" }, "GitHub"),
            ", or send us an ",
            React.createElement("a", { href: "mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:" }, "email"),
            " with a clear description of your problem. ",
            React.createElement("br", null),
            React.createElement("br", null),
            "We are aware of the following issues at this moment:\t\t\t  ",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Uneek looks quite awful with some web browsers, but it works fine with modern web browsers such as ",
                    React.createElement("a", { href: "https://www.google.se/chrome/" }, "Google Chrome"),
                    " or ",
                    React.createElement("a", { href: "https://www.mozilla.org/" }, "Mozilla Firefox")),
                React.createElement("li", null, " There is currently a limitation on the size of the input files (approximately 5 megabytes)."),
                React.createElement("li", null, " As of now, there is no documentation available.")),
            React.createElement("br", null),
            React.createElement("em", null, "Posted by Per Malm, February 11th, 2018."))),
    };
    const centered_logo = React.createElement("img", { className: "h400px", alt: "Logga", src: center });
    const above = (React.createElement("nav", { key: "above", className: "navbar navbar-default navbar-inverse" },
        React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "navbar-header" },
                React.createElement("button", { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false" },
                    React.createElement("span", { className: "sr-only" }, "Toggle navigation"),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" })),
                React.createElement("a", { className: "navbar-brand", href: "#" },
                    React.createElement("img", { alt: "Logga", src: logotop, height: "30px" }))),
            React.createElement("div", { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
                React.createElement("ul", { className: "nav navbar-nav" }),
                React.createElement("ul", { className: "nav navbar-nav navbar-right" },
                    React.createElement("li", null,
                        React.createElement("a", { href: "#news" }, "News")),
                    React.createElement("li", null,
                        React.createElement("a", { href: doc, download: "uneek-documentation.pdf" }, "Documentation")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#links" }, "Useful Links")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#", "data-target": "#exampleModal", "data-toggle": "modal" }, "Refer to Uneek")),
                    React.createElement("div", { className: "modal fade", id: "exampleModal", tabIndex: -1, role: "dialog", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
                        React.createElement("div", { className: "modal-dialog", role: "document" },
                            React.createElement("div", { className: "modal-content" },
                                React.createElement("div", { className: "modal-header" },
                                    React.createElement("h5", { className: "modal-title", id: "exampleModalLabel" }, "Use reference below."),
                                    React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                                React.createElement("div", { className: "modal-body" }, "Malm, P., Ahlberg, M., & Ros\u00E9n, D. (2018, May). Title here . In  (pp. xxx-xxx)."),
                                React.createElement("div", { className: "modal-footer" })))))))));
    const below = (React.createElement(React.Fragment, { key: "below" },
        React.createElement("div", { key: 1, className: "row container w100", style: { paddingRight: 0 } },
            React.createElement("div", { className: "col-md-4" },
                React.createElement("div", { className: "panel panel-default" },
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("h3", { className: "mrgn-tp-0" }, "Settings"),
                        React.createElement("hr", null),
                        React.createElement("h4", null, "Set Operations"),
                        React.createElement("div", { key: "1", className: "checkbox" },
                            React.createElement("label", null,
                                React.createElement(exports.Checkbox, { store: store.at('show_uniqueness') }),
                                "uniqueness differentiation [(A\u2013B) and (B\u2013A)]")),
                        React.createElement("div", { key: "2", className: "checkbox" },
                            React.createElement("label", null,
                                React.createElement(exports.Checkbox, { store: store.at('show_intersection') }),
                                "intersection analysis [A \u2229 B]")),
                        React.createElement("hr", null),
                        React.createElement("h4", null, "Input Format"),
                        React.createElement("div", { className: "radio-inline" },
                            React.createElement("label", null,
                                React.createElement(exports.Radio, { store: store.at('xml_input').via(reactive_lens_1.Lens.iso(x => !x, x => !x)) }),
                                "txt")),
                        React.createElement("div", { className: "radio-inline" },
                            React.createElement("label", null,
                                React.createElement(exports.Radio, { store: store.at('xml_input') }),
                                "xml")),
                        React.createElement("hr", null),
                        React.createElement("h4", null, "Syntactic Analysis"),
                        React.createElement("label", { className: "checkbox-inline" },
                            React.createElement(exports.Checkbox, { store: store.at('show_syntax') }),
                            "shallow")))),
            React.createElement("div", { className: "col-md-4" },
                React.createElement("h4", { className: "mrgn-tp-0 text-success" },
                    React.createElement("span", { className: "glyphicon glyphicon-info-sign" }),
                    " Suggestions"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "This tool is under development; so are the methods and thoughts revolving around it. See the ",
                        React.createElement("a", { href: "#" }, "News"),
                        " section for relevant updates. "),
                    React.createElement("li", null,
                        "See the ",
                        React.createElement("a", { href: "#" }, "Documentation"),
                        " for how to use the tool, for methods, and for technical information."),
                    React.createElement("li", null,
                        "If you experience problems, create an issue at ",
                        React.createElement("a", { href: "https://github.com/PerMalm/uneek/issues" }, "GitHub"),
                        ", or send us an ",
                        React.createElement("a", { href: "mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:" }, "email"),
                        "."),
                    React.createElement("li", null,
                        " Check out the ",
                        React.createElement("a", { href: "#" }, "Useful links"),
                        " for some, well, useful stuff, such as parsers, concordance tools, etc."),
                    React.createElement("li", null, " Processing large files may take some time; be patient."))),
            React.createElement("div", { className: "col-md-4", style: { paddingRight: 0 } },
                React.createElement("div", { className: "panel panel-default" },
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("h3", { className: "mrgn-tp-0" }, "Download Results"),
                        React.createElement("hr", null),
                        React.createElement("p", null, "When you download the results, you get all the analyses available in the \"Settings\" box to the left, that is:"),
                        React.createElement("ul", null,
                            React.createElement("li", null, "uniqueness differentiation"),
                            React.createElement("li", null, "intersectional analysis"),
                            React.createElement("li", null, "shallow analysis ")),
                        "Results come in a csv-file (comma separated value) sorted by absolute frequency."),
                    React.createElement("div", null,
                        React.createElement("hr", null),
                        React.createElement("button", { className: "btn btn-customi", onClick: () => {
                                const { A, B } = currently();
                                Utils.download(Uneek.full_export(A, B), 'results.csv');
                            } }, "Download Results"),
                        React.createElement("button", { className: "btn btn-customii", onClick: () => {
                                store.at('a').set(''), store.at('b').set('');
                            } }, "Clear All Fields"))))),
        React.createElement("footer", null,
            React.createElement("div", { className: "inner-footer" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-4 l-posts" },
                            React.createElement("h3", { className: "link" },
                                ' ',
                                React.createElement("img", { alt: "Logga", src: logo, height: "100px" }))),
                        React.createElement("div", { className: "col-md-4 f-about" },
                            React.createElement("h3", { className: "link" }, "Remember"),
                            React.createElement("p", null,
                                ' ',
                                "You shall know the difference between two polysemous words by the company one of them constantly rejects.")),
                        React.createElement("div", { className: "col-md-4 l-posts" }),
                        React.createElement("div", { className: "col-md-4 f-contact" },
                            React.createElement("h3", { className: "link" }, "Contact"),
                            React.createElement("p", null,
                                React.createElement("a", { href: "mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:" },
                                    React.createElement("i", { className: "fa fa-envelope" }),
                                    ' ',
                                    React.createElement("span", { className: "glyphicon glyphicon-envelope" }),
                                    "Per Malm")))))),
            React.createElement("div", { className: "last-div" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "copyright" },
                            "2018 Per Malm |",
                            React.createElement("a", { target: "_blank", rel: "nofollow", href: "https://opensource.org/licenses/MIT" }, "MIT-license"))))))));
    function currently() {
        const state = store.get();
        const a = store.at('a');
        const b = store.at('b');
        function parser(s) {
            if (!s) {
                return {};
            }
            else if (state.xml_input) {
                return Uneek.FromXML(s);
            }
            else {
                return { text: Uneek.Vectorize(s) };
            }
        }
        const [A, a_err] = Utils.listen({}, () => parser(state.a));
        const [B, b_err] = Utils.listen({}, () => parser(state.b));
        const errs = { a: a_err, b: b_err };
        const keys = Utils.keysof(A, B);
        const result = expr(() => {
            if (keys.some(k => k == state.key)) {
                return Uneek.VectorPair(A[state.key] || {}, B[state.key] || {});
            }
            else {
                return {};
            }
        });
        return { result, A, B, errs, keys };
    }
    function main() {
        const state = store.get();
        const { result, errs, keys } = currently();
        const only = (p) => Utils.record_filter(result, ({ a, b }) => p(a, b));
        const count = (name, w, filename) => (React.createElement("div", { style: { overflow: 'hidden' }, className: "thumbnail equal-width" },
            React.createElement("div", { className: "rows h100 centered vcentered" },
                React.createElement("div", { className: "caption" },
                    React.createElement("h3", null, name)),
                React.createElement("div", { className: "whitebox h100 w100 scroll" },
                    React.createElement("div", { className: "rows w100" }, Uneek.flat(w).map(({ a, b, word }) => (React.createElement("div", { key: word, className: "cols" },
                        React.createElement("span", { className: "w20 r" }, a > 0 && a),
                        React.createElement("span", { className: "w60 c" },
                            word,
                            " ",
                            a > 0 && b > 0 && React.createElement("span", { className: "small" }, a + b)),
                        React.createElement("span", { className: "w20 l" }, b > 0 && b)))))),
                React.createElement("button", { className: "btn btn-customi", onClick: () => Utils.download(Uneek.small_export(w), `${filename}.csv`) }, "Download"))));
        const input = (name) => (React.createElement("div", { className: "w20 thumbnail" },
            React.createElement("div", { className: "rows h100 centered vcentered" },
                React.createElement("div", { className: "caption" },
                    React.createElement("h3", null,
                        "Field ",
                        name.toUpperCase())),
                React.createElement(exports.Textarea, { className: "textarea", store: store.at(name), placeholder: exports.placeholder[name] }),
                errs[name] && React.createElement("div", { className: "error" }, errs[name]),
                React.createElement("div", { className: "marginalized" },
                    React.createElement("p", null),
                    React.createElement("label", { className: "btn btn-customi" },
                        "Upload",
                        React.createElement("input", { type: "file", style: { display: 'none' }, onChange: (e) => {
                                const me = e.target;
                                if (me && me.files && me.files.length > 0) {
                                    const file = me.files[0];
                                    const fr = new FileReader();
                                    const text = fr.readAsText(file);
                                    fr.onloadend = (ev) => {
                                        if (fr.result.length > 5000000) {
                                            store.at(name).set('We regret to inform you that the file is too large (approximately larger then 5 mb). We intend to fix this issue soon.');
                                            errs[name];
                                            console.log('too long');
                                        }
                                        else {
                                            if (fr.readyState == fr.DONE) {
                                                store.at(name).set(fr.result);
                                            }
                                        }
                                    };
                                }
                            } })),
                    React.createElement("button", { className: "btn btn-customii", onClick: () => store.at(name).set('') }, "Clear"),
                    React.createElement("p", null)))));
        return (React.createElement("div", { key: "main", className: "cols w100 h100 container col-md-4 marginalized some-height" },
            input('a'),
            React.createElement("div", { className: "w60 rows h100" },
                store.at('xml_input').get() && (React.createElement("div", { className: "cols centered marginalized", style: { display: 'inline-block', textAlign: 'center' } }, keys
                    .filter(k => store.at('show_syntax').get() || !k.startsWith('syn.shallow.'))
                    .map(k => (React.createElement("button", { key: k, onClick: () => store.at('key').set(k), disabled: k === state.key }, k))))),
                state.key == '' || (!state.show_uniqueness && !state.show_intersection) ? (React.createElement("div", { className: "h100 thumbnail centered vcentered cols" }, centered_logo)) : (React.createElement("div", { className: "cols h100 marginalized" },
                    state.show_uniqueness && count('A - B', only((a, b) => b == 0), 'a-only'),
                    state.show_intersection &&
                        count('A ∩ B', only((a, b) => a > 0 && b > 0), 'intersection'),
                    state.show_uniqueness && count('B - A', only((a, b) => a == 0), 'b-only')))),
            input('b')));
    }
    return () => (React.createElement("div", { className: "rows h100" },
        above,
        routes[store.get().location] || main(),
        below));
};
