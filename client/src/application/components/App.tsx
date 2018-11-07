import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import "../css/App.css";
import Routes from "../routes";
import { Navigation } from "./Navigation";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <Navigation />
    <div id="content">
      <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
    </div>
  </>
);

export default App;
