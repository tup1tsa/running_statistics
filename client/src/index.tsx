import { connectRouter, routerMiddleware } from "connected-react-router";
import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";

import App from "./application/components/App";
import RootReducer, {
  history
} from "./containers/reducers/rootReducerContainer";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(RootReducer),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
