"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../node_modules/bootstrap/dist/css/bootstrap-theme.min.css");
require("./index.css");
const App = require("./App");
const reactive_lens_1 = require("reactive-lens");
const react_dom_1 = require("react-dom");
const root = document.getElementById('root');
const reattach = reactive_lens_1.attach(vn => react_dom_1.render(vn, root), App.init, App.App);
if (module.hot) {
    module.hot.accept(() => {
        try {
            reattach(require('./App.tsx').App);
        }
        catch (e) {
            console.error(e);
        }
    });
}
