import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../../application/components/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const history = createBrowserHistory();
  ReactDOM.render(<App history={history} />, div);
});
