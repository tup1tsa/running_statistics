import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import NavigationConnector from "../connectors/NavigationConnector";
import RoutesConnector from "../connectors/routes/RoutesConnector";
import "../css/App.css";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <NavigationConnector />
    <div id="content">
      <ConnectedRouter history={history}>
        <RoutesConnector />
      </ConnectedRouter>
    </div>
  </>
);

export default App;
