import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./application/components/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
