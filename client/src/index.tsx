import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./application/components/App";
import { rootReducer } from "./application/reducers/rootReducer";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const history = createBrowserHistory();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
