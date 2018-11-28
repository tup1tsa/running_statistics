import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import "../css/App.css";
import NavigationContainer from "../reactContainers/NavigationContainer";
import Routes from "../routes";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <>
    <NavigationContainer />
    <div id="content">
      <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
    </div>
  </>
);

export default App;
