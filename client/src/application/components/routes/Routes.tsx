import React from "react";
import { Route, Switch } from "react-router";
import PathWatcherConnector from "../../connectors/PathWatcherConnector";
import RaceStartPreparationConnector from "../../connectors/RaceStartPreparationConnector";
import RaceViewerConnector from "../../connectors/RaceViewerConnector";
import { Message } from "../Message";
import { PrivateRoute } from "./PrivateRoute";

export interface RouteStateProps {
  readonly checkAuth: () => boolean;
}

const NoMatch = () => <div id="badUrl">404</div>;

const EmptyPage = () => <div />;

const Routes = ({ checkAuth }: RouteStateProps) => (
  <>
    <Switch>
      <Route exact={true} path="/" component={EmptyPage} />
      <PrivateRoute
        path="/startRace"
        component={RaceStartPreparationConnector}
        checkAuth={checkAuth}
      />
      <PrivateRoute
        path="/race/:raceType"
        component={PathWatcherConnector}
        checkAuth={checkAuth}
      />
      <PrivateRoute
        path="/detailedRaceStats"
        component={RaceViewerConnector}
        checkAuth={checkAuth}
      />
      <Route path="/message/:encodedMessage/:isError" component={Message} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default Routes;