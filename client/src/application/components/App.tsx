import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import NavigationConnector from "../connectors/NavigationConnector";
import RoutesConnector from "../connectors/routes/RoutesConnector";
import "../css/App.css";
import { Header } from "./Header";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <NavigationConnector />
    <div id="pageContainer">
      <Header />
      <div id="pageContent">
        <ConnectedRouter history={history}>
          <RoutesConnector />
        </ConnectedRouter>
      </div>
    </div>
  </>
);

export default App;
