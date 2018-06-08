import * as React from 'react';
import { RaceStats } from './RaceStats';
import { downloadRacesFactory } from './network/downloadRacesFactory';
import { divideRaceFactory } from './Path/pathUtilsFactories';

export const RaceStatsFactory = () =>
  <RaceStats downloadRaces={downloadRacesFactory} divideRace={divideRaceFactory} />;