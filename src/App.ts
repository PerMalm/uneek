import * as Uneek from './Uneek'
import * as Utils from './Utils'
// import * as News from "./News"

import { VNode } from "snabbdom/vnode"
import { attachTo } from "snabbdom/helpers/attachto"
import { Store, Lens, Omit } from "reactive-lens"
import { tags, tag, s, TagData } from "snabbis"

// export {News} 

const {div, span, h1} = tags

//const img = require('src/images/log.png')
//const doc = require('src/images/latextemplates.pdf')
// TODO fixa buggen!!
const doc = 'images/latextempates.pdf'

let next_unique = 0

export interface StoreSplice {
  selector: string,
  store: Store<any>
}

export const checkedF = (store: Store<boolean>): StoreSplice => ({selector: 'checked', store})
export const value = (store: Store<string>): StoreSplice => ({selector: 'value', store})

export function html(snippets: TemplateStringsArray, ...syncs: (StoreSplice | string)[]): VNode {
  let innerHTML = ''
  const cbs = [] as (() => void)[]
  syncs.forEach((sync: StoreSplice | string, i) => {
    if (typeof sync == 'string') {
      innerHTML += snippets[i]
      innerHTML += sync
    } else {
      const id = `snabbis-unique-${++next_unique}`
      const {store, selector} = sync
      innerHTML += snippets[i]
      innerHTML += ` id=${id} `
      cbs.push(() => window.requestAnimationFrame(() => {
        const elm = document.getElementById(id) as HTMLInputElement | null
        if (elm) {
          if ((elm as any)[selector] != store.get()) {
            (elm as any)[selector] = store.get()
          }
          store.ondiff((z: any, a: any) => z !== a && ((elm as any)[selector] = z))
          elm.onchange = () => store.set((elm as any)[selector])
          elm.oninput = () => store.set((elm as any)[selector])
        } else {
          console.error(`Element not found: ${id}`)
        }
      }))
    }
  })
  if (snippets.length > syncs.length) {
    innerHTML += snippets[snippets.length - 1]
  }
  return div, tag(
    'div',
    s.props({ innerHTML }),
    s.hook('update')(() => cbs.forEach(k => k())),
  )
}

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import * as jQuery from 'jquery'
; (window as any).jQuery = jQuery
import 'bootstrap'

// const sb: string = require('./sb.png')

export interface State {
  readonly a: string,
  readonly b: string,
  readonly key: string | '',
  readonly show_intersection: boolean
  readonly show_uniqueness: boolean
}

export const init: State = {
  a: '',
  b: '',
  key: '',
  show_intersection: true,
  show_uniqueness: true,
}

export const placeholder= {
  a: "Insert File A here, or use the button below to upload from your device.",
  b: "Insert File B here, or use the button below to upload from your device."
}

export const show = (s: any) => JSON.stringify(s, undefined, 2)

export const expr = <A>(k: () => A) => k()

export const App = (store: Store<State>) => {
  const global = window as any
  global.store = store
  global.reset = () => store.set(init)
  store.storage_connect('uneek')
  const key_input = html `<input ${value(store.at('key'))}>`
 // store.at('news').location_connect(News.to_hash, News.from_hash)


  const above = html`
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img alt="Logga" src="X">
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">

        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">News</a></li>
          <li><a href="${doc}" download="uneek-documentation.pdf">Documentation</a></li>
          <li><a href="#">Useful Links</a></li>
          <li><a href="#" data-target="#exampleModal" data-toggle="modal" >Refer to Uneek</a></li>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Use reference below.</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Malm, P., Ahlberg, M., & Rosén, D. (2018, May). Title here . In LREC (pp. xxx-xxx).
        </div>
        <div class="modal-footer">
        <!--  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>

        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>`

  const below = html`
  <div class="row container w100">  
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <h3 class="mrgn-tp-0">Settings</h3>
            <hr>
            <h4>Set Operations</h4>
            <div class="checkbox">
              <label>
              <input type="checkbox" ${checkedF(store.at('show_intersection'))}>
              uniqueness differentiation [(A–B) and (B–A)]</label>
            </div>
            <div class="checkbox">
              <label>
              <input type="checkbox" value="" ${checked(store.at('show_intersection'))}>
              intersectional analysis  [A &#8745; B]</label>
            </div>
            <hr>
            <h4>Input format</h4>
<div class="radio-inline">
   <label><input type="radio" name="optradio">txt</label>
</div>
<div class="radio-inline">
   <label><input type="radio" name="optradio">xml</label>
</div>
    <!--        <hr>
            <h4>Statistics</h4>
            <label class="checkbox-inline">
            <input type="checkbox" value="">
            absolute numbers</label>
            <label class="checkbox-inline">
            <input type="checkbox" value="">
            data saturation</label> -->
            <hr>
            <h4>Syntactic Analysis</h4>
            <label class="checkbox-inline">
            <input type="checkbox" value="">
            shallow</label>
         <!--   <label class="checkbox-inline">
            <input type="checkbox" value="">
            deep</label> -->
          </div>

        </div>
      </div>
      <div class="col-md-4">
    <!--  <h3> Some suggestions</h3> -->
      <h4>  </h4>

        <h4 class="mrgn-tp-0 text-success"><span class="glyphicon glyphicon-info-sign"></span> Suggestions</h4>
        <ul>
          <li>This web-tool is under development; so are the methods and thoughts revolving around it. See the <a href="#">News</a> section for relevant updates. </li>
          <li>See the <a href="#">Documentation</a> for how to use the tool, for methods, and for technical information.</li>
          <li>Please send suggestions, bug reports etc. to <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">my email</a>.</li>
          <li> Check out <a href="#">Useful links</a> for some, well, useful stuff, such as parsers, concordance tools, etc.</li>
          <li> Processing large files may take some time; be patient.</li>
	
        </ul>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <h3 class="mrgn-tp-0">Download Results</h3>
      <hr>
<p>
    When you download the results, you get all the analyses available in the "Settings" box to the left, that is:
</p>
      <ul>
		<li>uniqueness differentiation</li>
		<li>intersectional analysis</li>
		<li>shallow analysis </li>
		<li>(and soon, deep analysis)  </li>
      </ul>	
	Results come in txt, listed for absolute frequency. 
          </div>
          <div>
            <hr>
  <center> <button type="button" class="btn btn-customi">Download Results</button>
  <button type="button" class="btn btn-customii ">Clear All Fields</button> </center>
<p></p>
        </div>
        </div>
        </div>

    </div>
    </div>


  <footer>
    <div class="inner-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 l-posts">
            <h3 class="link"><img alt="Logga" src="X"></h3>

          </div>
          <div class="col-md-4 f-about">
            <h3 class="link">Remember</h3>
	
                <p> You shall know the difference between two polysemous words by the company one of them constantly rejects.
            </p>
          </div>
          <div class="col-md-4 l-posts">

          </div>
          <div class="col-md-4 f-contact">
            <h3 class="link">Contact</h3>
            <a href="#">
              <p><i class="fa fa-envelope"></i> <span class="glyphicon glyphicon-envelope"></span> <a href="mailto:per.malm@nordiska.uu.se?subject=Sent%20from%20Uneek%20site:">Per Malm</a></p>
            </a>
          </div>
        </div>
      </div>
    </div>


    <div class="last-div">
      <div class="container">
        <div class="row">
	<div class="copyright">© 2018 Per Malm | <a target="_blank" rel="nofollow" href="https://opensource.org/licenses/MIT">MIT-license</a></div>
          </div>
        </div>
      </div>



    </div>


  </footer>
    `

  return () => {
    const a = store.at('a')
    const b = store.at('b')
    const [A, a_err] = Utils.listen({}, () => Uneek.FromXML(`<text>${a.get()}</text>`))
    const [B, b_err] = Utils.listen({}, () => Uneek.FromXML(`<text>${b.get()}</text>`))
    const keys = Utils.keysof(A, B)
    const result = expr(() => {
      const key = store.at('key').get()
      if (keys.some(k => k == key)) {
        return Uneek.VectorPair(A[key] || {}, B[key] || {})
      } else {
        return {}
      }
    })

    const only =
      (p: (a: number, b: number) => boolean) =>
      Utils.record_filter(result, ({a, b}) => p(a,b))

    const count =
      (w: Uneek.VectorPair) =>
      tag('.whitebox.equal-width.scroll',
        Utils.record_traverse(w, ({a, b}, k) => ({a, b, k}))
          .sort((l, r) => (r.a + r.b) - (l.a + l.b))
          .map(({a, b, k}) =>
            tag('.rows',
              tag('span.w20.r', a > 0 && a),
              tag('span.w60.c', k, a > 0 && b > 0 && tag('span.small', ` (${a + b})`)),
              tag('span.w20.l', b > 0 && b))))

    const input =
      (name: 'a' | 'b') =>
      tag('.w20.thumbnail',
        tag('.cols.h100.centered.vcentered',
          tag('caption', tag('h3', 'Field ' + name.toUpperCase())),
          s.textarea(
            store.at(name), undefined, undefined,
            s.classed('textarea'),
            s.attrs({"placeholder": placeholder[name]})),
          // the error message:
          a_err && tag('.error', a_err),
          tag('div.marginalized',
		  	tag('p.'),
            tag('button.btn.btn-customi',s.attrs({type:"button"}),'Upload'),
            tag('button.btn.btn-customii',s.attrs({type:"button"}),'Clear'),
		  	tag('p.'),
		  
          )
        )
      )


    return tag('div.cols.h100',
      above,
      tag('.rows.w100.h100.container.col-md-4.marginalized.some-height',
        input('a'),
        tag('.w60.cols.h100',
          //key_input,
          // force automatically listed attribute buttons to stay within margins
          tag('.rows.centered.marginalized',s.attrs({style: "display: inline-block;text-align:center"}),
            keys.map(
              k =>
                s.button(
                  () => store.at('key').set(k),
                  k,
                  s.attrs({disabled: k === store.at('key').get()})))),
          (store.get().key == '') ?
          tag('.h100.thumbnail.centered.vcentered.rows', tag('span', 'Uneek')) :
          tag('.rows.h100.marginalized',
            store.get().show_uniqueness && count(only((a, b) => b == 0)),
            store.get().show_intersection && count(only((a, b) => a > 0 && b > 0)),
            store.get().show_uniqueness && count(only((a, b) => a == 0)),
          )),
        input('b')),
      below)
  }
}

