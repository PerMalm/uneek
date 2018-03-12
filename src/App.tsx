import * as Uneek from './Uneek'
import * as Utils from './Utils'

import * as React from 'react'
import {Store, Lens, Omit} from 'reactive-lens'

const logo = require('./images/nerlog.svg')
const center = require('./images/uneekCenter.svg')
const logotop = require('./images/slimlog.svg')
const doc1 = require('./images/doc1.pdf')

// dokumentation: tag(tagnamn.klass.klass..., attribut, namn)

// const sb: string = require('./sb.png')

type VNode = React.ReactElement<{}>

export const Input = (store: Store<string>) => (
  <input
    value={store.get()}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => store.set(e.target.value)}
  />
)

export const Textarea = ({
  store,
  ...props
}: {store: Store<string>} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    value={store.get()}
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => store.set(e.target.value)}
  />
)

export const Checkbox = ({
  store,
  ...props
}: {store: Store<boolean>} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    type="checkbox"
    ref={input => {
      if (input) {
        input.checked = store.get()
        store.ondiff(b => (input.checked = b))
        input.onchange = () => store.set(input.checked)
      }
    }}
  />
)

export const Radio = ({
  store,
  ...props
}: {store: Store<boolean>} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="radio"
    {...props}
    ref={input => {
      if (input) {
        input.checked = store.get()
        store.ondiff(b => (input.checked = b))
        input.onchange = () => store.set(input.checked)
      }
    }}
  />
)

export interface State {
  readonly a: string
  readonly b: string
  readonly key: string | ''
  readonly show_intersection: boolean
  readonly show_uniqueness: boolean
  readonly show_syntax: boolean
  readonly location: string
  readonly xml_input: boolean
}

export const init: State = {
  a: '',
  b: '',
  key: '',
  show_intersection: true,
  show_uniqueness: true,
  show_syntax: false,
  location: '',
  xml_input: true,
}

export const placeholder = {
  a: 'Insert File A here, or use the button below to upload from your device.',
  b: 'Insert File B here, or use the button below to upload from your device.',
}

export const show = (s: any) => JSON.stringify(s, undefined, 2)

export function expr<A>(k: () => A) {
  return k()
}

export const App = (store: Store<State>) => {
  const global = window as any
  global.store = store
  global.reset = () => store.set(init)
  const length_limit = 1000000
  store.storage_connect('uneek', state => JSON.stringify(state).length < length_limit)
  store.at('xml_input').ondiff(b => {
    if (!b && store.get().key != 'text') {
      store.update({key: 'text'})
    }
  })

  Store.location_connect(store.at('location'))

  const routes: Record<string, VNode> = {
    about: (
      <div>
        <div className="whitebox container w60 padding3 centerdiv margin-b5">
          <h2>Use reference below</h2>
          Malm, P., Ahlberg, M., & Rosén, D. (fourthcoming). Uneek: a Web Tool for Comparative
          Analysis of Annotated Texts. In{' '}
          <em>
            {' '}
            Proceedings of the IFNW 2018 Workshop on Multilingual FrameNets and Constructicons at
            LREC 2018
          </em>. Miyazaki: ELRA.
        </div>
      </div>
    ),

    links: (
      <div>
        <div className="whitebox container w60 padding3 centerdiv margin-b5">
          <h2>Useful Links</h2>
          <h3>Automatic Annotation Tools</h3>

          <dl>
            <dt>
              <a href="https://spraakbanken.gu.se/sparv">Sparv</a>
            </dt>
            <dd>
              Sparv is Språkbanken’s corpus annotation pipeline infrastructure. The easiest way to
              use the pipeline is from its web interface with a plain text document. The pipeline
              uses in-house and external tools on the text to segment it into sentences and
              paragraphs, tokenise, tag parts-of-speech, look up in dictionaries and analyse
              compounds. The pipeline can also be run using a web API with XML results, and it is
              run locally at Språkbanken to prepare the documents in Korp, Språkbanken's corpus
              search tool. While the most sophisticated support is for modern Swedish, the pipeline
              supports 15 languages.
            </dd>
          </dl>

          <dl>
            <dt>
              <a href="http://stp.lingfil.uu.se/swegram/">SWEGRAM</a>
            </dt>
            <dd>
              SWEGRAM is a web-based tool for the automatic linguistic annotation and quantitative
              analysis of Swedish text, enabling researchers in the humanities and social sciences
              to annotate their own text and produce statistics on linguistic and other text-related
              features on the basis of this annotation. The tool allows users to upload one or
              several documents, which are automatically fed into a pipeline of tools for
              tokenization and sentence segmentation, spell checking, part-of-speech tagging and
              morpho-syntactic analysis as well as dependency parsing for syntactic annotation of
              sentences. The analyzer provides statistics on the number of tokens, words and
              sentences, the number of parts of speech (PoS), readability measures, the average
              length of various units, and frequency lists of tokens, lemmas, PoS, and spelling
              errors. SWEGRAM allows users to create their own corpus or compare texts on various
              linguistic levels.
            </dd>
          </dl>

          <h3>Corpora and Concordance Tools</h3>

          <dl>
            <dt>
              <a href="https://spraakbanken.gu.se/korp">Korp</a>
            </dt>
            <dd>
              Korp is Språkbanken's corpus tool which among other things lets you view concordances
              in a vast amount of corpora (mostly Swedish).
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="https://corpus.byu.edu/coca/">The Corpus of Contemporary American English</a>
            </dt>
            <dd>
              The Corpus of Contemporary American English (COCA) is the largest freely-available
              corpus of English, and the only large and balanced corpus of American English.{' '}
            </dd>
          </dl>

          <h3>Grammatical Frameworks</h3>

          <dl>
            <dt>
              <a href="http://universaldependencies.org/">Universal Dependencies</a>
            </dt>
            <dd>
              Universal Dependencies (UD) is a framework for cross-linguistically consistent
              grammatical annotation and an open community effort with over 200 contributors
              producing more than 100 treebanks in over 60 languages.
            </dd>
          </dl>
          <h3>Lexical Resources</h3>

          <dl>
            <dt>
              <a href="https://framenet.icsi.berkeley.edu/fndrupal/">FrameNet</a>
            </dt>
            <dd>
              The FrameNet project is building a lexical database of English that is both human- and
              machine-readable, based on annotating examples of how words are used in actual texts.
              From the student's point of view, it is a dictionary of more than 13,000 word senses,
              most of them with annotated examples that show the meaning and usage. For the
              researcher in Natural Language Processing, the more than 200,000 manually annotated
              sentences linked to more than 1,200 semantic frames provide a unique training dataset
              for semantic role labeling, used in applications such as information extraction,
              machine translation, event recognition, sentiment analysis, etc.
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="https://spraakbanken.gu.se/karp">Karp</a>
            </dt>
            <dd>
              Karp is an open lexical infrastructure and a web based tool for searching, exploring
              and developing lexical resources. Språkbanken currently hosts a number of lexicons
              (mostly Swedish) in Karp and on-going work aims at broadening the type of resources
              that can be developed in the system. Karp also hosts the Swedish FrameNet and the
              Swedish Constructicon.
            </dd>
          </dl>
        </div>
      </div>
    ),

    news: (
      <div>
        <div className="whitebox container w60 padding3 centerdiv margin-b5">
          <h2>Updated version</h2>
          It is now solved, the issue concerning the size limit on the input files. Also, there is
          now some{' '}
          <a href={doc1} download="./images/doc1.pdf">
            {' '}
            documentation{' '}
          </a>{' '}
          available for Uneek. <br />
          <br />
          <em>Posted by Per Malm, March 12th, 2018.</em>
        </div>
        <div className="whitebox container w60 padding3 centerdiv margin-b5">
          <h2>Launch day!</h2>
          The first version of Uneek is now up and running. In a nutshell, Uneek is a program that
          does what linguists often do: (i) look for differences or similarities between two texts,
          (ii) sort these out, (iii) and summarize them. If you experience technical problems,
          create an issue at <a href="https://github.com/PerMalm/uneek/issues">GitHub</a>, or send
          us an{' '}
          <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">email</a>{' '}
          with a clear description of your problem. <br />
          <br />
          We are aware of the following issues at this moment: <br />
          <br />
          <ul>
            <li>
              Uneek looks quite awful with some web browsers, but it works fine with modern web
              browsers such as <a href="https://www.google.se/chrome/">Google Chrome</a> or{' '}
              <a href="https://www.mozilla.org/">Mozilla Firefox</a>
            </li>
            <li>
              {' '}
              There is currently a limitation on the size of the input files (approximately 5
              megabytes).
            </li>
            <li> As of now, there is no documentation available.</li>
          </ul>
          <br />
          <em>Posted by Per Malm, February 11th, 2018.</em>
        </div>
      </div>
    ),
  }

  const centered_logo = <img className="h400px" alt="Logga" src={center} />

  const above = (
    <nav key="above" className="navbar navbar-default navbar-inverse">
      <div className="container-fluid">
        {
          //<!-- Brand and toggle get grouped for better mobile display -->
        }
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">
            <img alt="Logga" src={logotop} height="30px" />
          </a>
        </div>

        {
          //<!-- Collect the nav links, forms, and other content for toggling -->
        }
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav" />

          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#news">News</a>
            </li>
            <li>
              <a href={doc1} download="./images/doc1.pdf">
                Documentation
              </a>
            </li>
            <li>
              <a href="#links">Useful Links</a>
            </li>
            <li>
              <a href="#about">Refer to Uneek</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

  const below = (
    <React.Fragment key="below">
      <div key={1} className="row container w100" style={{paddingRight: 0}}>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3 className="mrgn-tp-0">Settings</h3>
              <hr />
              <h4>Set Operations</h4>
              <div key="1" className="checkbox">
                <label>
                  <Checkbox store={store.at('show_uniqueness')} />
                  uniqueness differentiation [(<i>A − B</i>), (<i>B − A</i>)]
                </label>
              </div>
              <div key="2" className="checkbox">
                <label>
                  <Checkbox store={store.at('show_intersection')} />
                  intersectional analysis [<i>A &#8745; B</i>]
                </label>
              </div>
              <hr />
              <h4>Input Format</h4>
              <div className="radio-inline">
                <label>
                  <Radio store={store.at('xml_input').via(Lens.iso(x => !x, x => !x))} />txt
                </label>
              </div>
              <div className="radio-inline">
                <label>
                  <Radio store={store.at('xml_input')} />xml
                </label>
              </div>
              <hr />
              <h4>Syntactic Analysis</h4>
              <label className="checkbox-inline">
                <Checkbox store={store.at('show_syntax')} />
                shallow
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="mrgn-tp-0 text-success">
            <span className="glyphicon glyphicon-info-sign" /> Suggestions
          </h4>
          <ul>
            <li>
              This tool is under development; so are the methods and thoughts revolving around it.
              See the <a href="#news">News</a> section for relevant updates.{' '}
            </li>
            <li>
              See the <a href={doc1}>Documentation</a> for how to use the tool, for methods, and for
              technical information.
            </li>
            <li>
              If you experience problems, create an issue at{' '}
              <a href="https://github.com/PerMalm/uneek/issues">GitHub</a>, or send us an{' '}
              <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">email</a>.
            </li>
            <li>
              {' '}
              Check out the <a href="#links">Useful links</a> for related useful things such as
              parsers, concordance tools, etc.
            </li>
            <li> Processing large files may take some time; be patient.</li>
          </ul>
        </div>
        <div className="col-md-4" style={{paddingRight: 0}}>
          <div className="panel panel-default">
            <div className="panel-body">
              <h3 className="mrgn-tp-0">Download Results</h3>
              <hr />
              <p>
                When you download the results, you get all the analyses available in the "Settings"
                box to the left, that is:
              </p>
              <ul>
                <li>uniqueness differentiation</li>
                <li>intersectional analysis</li>
                <li>shallow analysis </li>
              </ul>
              Results come in a csv-file (comma separated value) sorted by absolute frequency.
            </div>
            <div className="marginalized">
              <hr />
              <button
                className="btn btn-customi"
                onClick={() => {
                  const {A, B} = currently()
                  Utils.download(Uneek.full_export(A, B), 'results.csv')
                }}>
                Download Results
              </button>
              <button
                className="btn btn-customii"
                onClick={() => {
                  store.at('a').set(''), store.at('b').set('')
                }}>
                Clear All Fields
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="inner-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 l-posts">
                <h3 className="link">License</h3>
                <p>
                  {' '}
                  <a target="_blank" rel="nofollow" href="https://opensource.org/licenses/MIT">
                    MIT-license
                  </a>
                </p>
              </div>
              <div className="col-md-4 f-about">
                <h3 className="link">Remember</h3>

                <p>
                  {' '}
                  You shall know the difference between two polysemous words by the company one of
                  them constantly rejects.
                </p>
              </div>
              <div className="col-md-4 l-posts" />
              <div className="col-md-4 f-contact">
                <h3 className="link">Contact</h3>
                <p>
                  <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">
                    <i className="fa fa-envelope" />{' '}
                    <span className="glyphicon glyphicon-envelope" /> Per Malm
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )

  function currently() {
    const state = store.get()
    const a = store.at('a')
    const b = store.at('b')
    function parser(s: string): Uneek.Text {
      if (!s) {
        return {}
      } else if (state.xml_input) {
        return Uneek.FromXML(s)
      } else {
        return {text: Uneek.Vectorize(s)}
      }
    }
    const [A, a_err] = Utils.listen({}, () => parser(state.a))
    const [B, b_err] = Utils.listen({}, () => parser(state.b))
    const errs = {a: a_err, b: b_err}
    const keys = Utils.keysof(A, B)
    const result = expr(() => {
      if (keys.some(k => k == state.key)) {
        return Uneek.VectorPair(A[state.key] || {}, B[state.key] || {})
      } else {
        return {}
      }
    })
    return {result, A, B, errs, keys}
  }

  function main() {
    const state = store.get()
    const {result, errs, keys} = currently()

    const only = (p: (a: number, b: number) => boolean) =>
      Utils.record_filter(result, ({a, b}) => p(a, b))

    const count = (name: string, w: Uneek.VectorPair, filename: string) => (
      <div style={{overflow: 'hidden'}} className="thumbnail equal-width">
        <div className="rows h100 centered vcentered">
          <div className="caption">
            <h3>
              <i>{name}</i>
            </h3>
          </div>
          <div className="whitebox h100 w100 scroll">
            <div className="rows w100">
              {Uneek.flat(w).map(({a, b, word}) => (
                <div key={word} className="cols">
                  <span className="w20 r">{a > 0 && a}</span>
                  <span className="w60 c">
                    {word} {a > 0 && b > 0 && <span className="small">{a + b}</span>}
                  </span>
                  <span className="w20 l">{b > 0 && b}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="btn btn-customi"
            onClick={() => Utils.download(Uneek.small_export(w), `${filename}.csv`)}>
            Download
          </button>
        </div>
      </div>
    )

    const input = (name: 'a' | 'b') => (
      <div className="w20 thumbnail">
        <div className="rows h100 centered vcentered">
          <div className="caption">
            <h3>Field {name.toUpperCase()}</h3>
          </div>
          <Textarea className="textarea" store={store.at(name)} placeholder={placeholder[name]} />
          {errs[name] && <div className="error">{errs[name]}</div>}
          <div className="marginalized">
            <p />
            <label className="btn btn-customi">
              Upload
              <input
                type="file"
                style={{display: 'none'}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const me = e.target as HTMLInputElement
                  if (me && me.files && me.files.length > 0) {
                    const file = me.files[0]
                    const fr = new FileReader()
                    const text = fr.readAsText(file)
                    fr.onloadend = (ev: ProgressEvent) => {
                      if (fr.readyState == fr.DONE) {
                        store.at(name).set(fr.result)
                      }
                    }
                  }
                }}
              />
            </label>
            <button className="btn btn-customii" onClick={() => store.at(name).set('')}>
              Clear
            </button>
            <p />
          </div>
        </div>
      </div>
    )

    return (
      <div key="main" className="cols w100 h100 container col-md-4 marginalized some-height">
        {input('a')}
        <div className="w60 rows h100">
          {store.at('xml_input').get() && (
            <div
              className="cols centered marginalized"
              style={{display: 'inline-block', textAlign: 'center'}}>
              {keys
                .filter(k => store.at('show_syntax').get() || !k.startsWith('syn.shallow.'))
                .map(k => (
                  <button key={k} onClick={() => store.at('key').set(k)} disabled={k === state.key}>
                    {k}
                  </button>
                ))}
            </div>
          )}
          {state.key == '' || (!state.show_uniqueness && !state.show_intersection) ? (
            <div className="h100 thumbnail centered vcentered cols">{centered_logo}</div>
          ) : (
            <div className="cols h100 marginalized">
              {state.show_uniqueness && count('A − B', only((a, b) => b == 0), 'a-only')}
              {state.show_intersection &&
                count('A ∩ B', only((a, b) => a > 0 && b > 0), 'intersection')}
              {state.show_uniqueness && count('B − A', only((a, b) => a == 0), 'b-only')}
            </div>
          )}
        </div>
        {input('b')}
      </div>
    )
  }

  return () => (
    <div className="rows h100">
      {above}
      {routes[store.get().location] || main()}
      {below}
    </div>
  )
}
