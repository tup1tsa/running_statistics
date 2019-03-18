import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import AutoLoginConnector from "../connectors/AutoLoginConnector";
import NavigationConnector from "../connectors/NavigationConnector";
import "../css/App.css";
import Routes from "../routes";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <NavigationConnector />
    <AutoLoginConnector />
    <div id="content">
      <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
    </div>
  </>
);

export default App;
