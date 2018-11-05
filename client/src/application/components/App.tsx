import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { Route, Switch } from "react-router";
import "../css/App.css";
import { Navigation } from "./Navigation";

interface AppProps {
  history: History;
}

const Hello = () => <div>Hello</div>;

const NoMatch = () => <div>404</div>;

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact={true} path="/" component={Navigation} />
      <Route path="/hello" component={Hello} />
      <Route component={NoMatch} />
    </Switch>
  </ConnectedRouter>
);

export default App;
