import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import "../css/App.css";
import Routes from "../routes";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
);

export default App;
