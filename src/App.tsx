import * as Uneek from './Uneek'
import * as Utils from './Utils'

import * as React from 'react'
import {Store, Lens, Omit} from 'reactive-lens'

const logo = require('./images/nerlog.svg')
const center = require('./images/uneekCenter.svg')
const logotop = require('./images/slimlog.svg')

// dokumentation: tag(tagnamn.klass.klass..., attribut, namn)

//const doc = require('src/images/latextemplates.pdf')
// TODO fixa buggen!!
const doc = 'images/latextempates.pdf'

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
  store.storage_connect('uneek')
  store.at('xml_input').ondiff(b => {
    if (!b && store.get().key != 'text') {
      store.update({key: 'text'})
    }
  })

  store.at('location').location_connect(s => '#' + s, s => s.slice(1))

  const routes: Record<string, VNode> = {
    links: (
      <div key="links" className="whitebox container">
        <h3>Links</h3>
        <ul>
          <li>
            <a href="http://universaldependencies.org/">UD</a>
          </li>
        </ul>
      </div>
    ),

    news: (
      <div key="news" className="whitebox container">
        <h3>News</h3>
        <ul>
          <li>Boomtime, 2nd day of Chaos in YOLD 3184: Added news section</li>
        </ul>
      </div>
    ),
  }

  const centered_logo = <img alt="Logga" src={center} height="400px" />

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
              <a href={doc} download="uneek-documentation.pdf">
                Documentation
              </a>
            </li>
            <li>
              <a href="#links">Useful Links</a>
            </li>
            <li>
              <a href="#" data-target="#exampleModal" data-toggle="modal">
                Refer to Uneek
              </a>
            </li>

            {
              // <!-- Modal -->
            }
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Use reference below.
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Malm, P., Ahlberg, M., & Rosén, D. (2018, May). Title here . In LREC (pp.
                    xxx-xxx).
                  </div>
                  <div className="modal-footer">
                    {
                      // <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      // <button type="button" className="btn btn-primary">Save changes</button> -->
                    }
                  </div>
                </div>
              </div>
            </div>
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
                  uniqueness differentiation [(A–B) and (B–A)]
                </label>
              </div>
              <div key="2" className="checkbox">
                <label>
                  <Checkbox store={store.at('show_intersection')} />
                  intersection analysis [A &#8745; B]
                </label>
              </div>
              <hr />
              <h4>Input format</h4>
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
              This web-tool is under development; so are the methods and thoughts revolving around
              it. See the <a href="#">News</a> section for relevant updates.{' '}
            </li>
            <li>
              See the <a href="#">Documentation</a> for how to use the tool, for methods, and for
              technical information.
            </li>
            <li>
              Please send suggestions, bug reports etc. to{' '}
              <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">
                my email
              </a>.
            </li>
            <li>
              {' '}
              Check out the <a href="#">Useful links</a> for some, well, useful stuff, such as
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
                <li>(and soon, deep analysis) </li>
              </ul>
              Results come in txt, listed for absolute frequency.
            </div>
            <div>
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
                <h3 className="link">
                  {' '}
                  <img alt="Logga" src={logo} height="100px" />
                </h3>
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
                    <span className="glyphicon glyphicon-envelope" />
                    Per Malm
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="last-div">
          <div className="container">
            <div className="row">
              <div className="copyright">
                © 2018 Per Malm |
                <a target="_blank" rel="nofollow" href="https://opensource.org/licenses/MIT">
                  MIT-license
                </a>
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
            <h3>{name}</h3>
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
                    k
                  </button>
                ))}
            </div>
          )}
          {state.key == '' || (!state.show_uniqueness && !state.show_intersection) ? (
            <div className="h100 thumbnail centered vcentered cols">{centered_logo}</div>
          ) : (
            <div className="cols h100 marginalized">
              {state.show_uniqueness && count('A-B', only((a, b) => b == 0), 'a-only')}
              {state.show_intersection &&
                count('A ∩ B', only((a, b) => a > 0 && b > 0), 'intersection')}
              {state.show_uniqueness && count('B-A', only((a, b) => a == 0), 'b-only')}
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
