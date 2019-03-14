import React from "react";
import { Route, Switch } from "react-router";
import { Message } from "../components/Message";
import PathWatcherConnector from "../connectors/PathWatcherConnector";
import RaceStartPreparationConnector from "../connectors/RaceStartPreparationConnector";
import RaceViewerConnector from "../connectors/RaceViewerConnector";

const NoMatch = () => <div id="badUrl">404</div>;

const EmptyPage = () => <div />;

const routes = (
  <>
    <Switch>
      <Route exact={true} path="/" component={EmptyPage} />
      <Route
        exact={true}
        path="/startRace"
        component={RaceStartPreparationConnector}
      />
      <Route path="/race/:raceType" component={PathWatcherConnector} />
      <Route path="/message/:encodedMessage/:isError" component={Message} />
      <Route path="/detailedRaceStats" component={RaceViewerConnector} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default routes;
