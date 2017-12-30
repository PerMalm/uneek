import * as Uneek from './Uneek'
import * as Utils from './Utils'

import { VNode } from "snabbdom/vnode"
import { Store, Lens, Omit } from "reactive-lens"
import { tags, tag, s, TagData } from "snabbis"
const {div, span, h1} = tags

export const html = (innerHTML: string) => tag('div', s.props({ innerHTML }))

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import * as jQuery from 'jquery'
; (window as any).jQuery = jQuery
import 'bootstrap'

const sb: string = require('./sb.png')

export interface State {
  readonly a: string,
  readonly b: string,
  readonly key: string | '',
}

export const init: State = {
  a: '',
  b: '',
  key: '',
}

export const show = (s: any) => JSON.stringify(s, undefined, 2)

export const App = (store: Store<State>) => {
  const global = window as any
  global.store = store
  global.reset = () => store.set(init)
  store.storage_connect('uneek')
  return () => View(store)
}

export const expr = <A>(k: () => A) => k()

export const View = (store: Store<State>): VNode => {
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
    tag('.whitebox.w33.scroll',
      Utils.record_traverse(w, ({a, b}, k) => ({a, b, k}))
        .sort((l, r) => (r.a + r.b) - (l.a + l.b))
        .map(({a, b, k}) =>
          tag('.rows',
            tag('span.w20.r', a > 0 && a),
            tag('span.w60.c', k, a > 0 && b > 0 && tag('span.small', ` (${a + b})`)),
            tag('span.w20.l', b > 0 && b))))

  return tag('div.cols.h100',
    html(`
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
      <a class="navbar-brand" href="#">Brand</a>
      <img src="${sb}"/>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>`),
    tag('.rows.w100.h100.marginalized',
      tag('.w20',
        tag('.cols.h100.centered.vcentered',
          s.textarea(a, undefined, undefined, s.classed('textarea')),
          a_err && tag('.error', a_err)
        )),
      tag('.w60.cols.h100',
        tag('.rows.centered.marginalized',
          keys.map(
            k =>
              s.button(
                () => store.at('key').set(k),
                k,
                s.attrs({disabled: k === store.at('key').get()}))),
          tag('img', s.attrs({src: sb, height: '24px'}))),
        tag('.rows.h100.marginalized',
          count(only((a, b) => b == 0)),
          count(only((a, b) => a > 0 && b > 0)),
          count(only((a, b) => a == 0)),
        )
      ),
      tag('.w20',
        tag('.cols.h100.centered.vcentered',
          s.textarea(b, undefined, undefined, s.classed('textarea')),
          b_err && tag('.error', b_err)
        )),
  ))
}
