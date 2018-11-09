import * as React from "react";
import { Route, Switch } from "react-router";
import { Message } from "../components/Message";
import PathWatcherContainer from "../reactContainers/PathWatcherContainer";
import RaceStartPreparationContainer from "../reactContainers/RaceStartPreparationContainer";
import RaceViewerContainer from "../reactContainers/RaceViewerContainer";

const NoMatch = () => <div id="badUrl">404</div>;

const EmptyPage = () => <div />;

const routes = (
  <>
    <Switch>
      <Route exact={true} path="/" component={EmptyPage} />
      <Route path="/startRace" component={RaceStartPreparationContainer} />
      <Route path="/race/:raceType" component={PathWatcherContainer} />
      <Route path="/message/:messageId/:isError" component={Message} />
      <Route path="/detailedRaceStats" component={RaceViewerContainer} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default routes;
