import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { loginViaToken } from "./application/actions/async/loginViaToken";
import App from "./application/components/App";
import rootReducer from "./application/reducers/rootReducer";
import "./application/scss/index.scss";
import loadIcons from "./loadIcons";
import registerServiceWorker from "./registerServiceWorker";

loadIcons();

const history = createBrowserHistory();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

loginViaToken()(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
