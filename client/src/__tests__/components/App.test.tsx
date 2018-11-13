import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "../../application/components/App";
import rootReducerContainer from "../../containers/reducers/rootReducerContainer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const history = createBrowserHistory();
  const store = createStore(rootReducerContainer(history));
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    div
  );
});
