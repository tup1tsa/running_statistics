import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "../../application/components/App";
import { rootReducer } from "../../application/reducers/rootReducer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const history = createBrowserHistory();
  const store = createStore(rootReducer(history));
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    div
  );
});
