import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import HeaderConnector from "../connectors/HeaderConnector";
import NavigationConnector from "../connectors/NavigationConnector";
import RoutesConnector from "../connectors/routes/RoutesConnector";
import "../css/App.css";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <NavigationConnector />
    <div id="pageContainer">
      <HeaderConnector />
      <div id="pageContent">
        <ConnectedRouter history={history}>
          <RoutesConnector />
        </ConnectedRouter>
      </div>
    </div>
  </>
);

export default App;
