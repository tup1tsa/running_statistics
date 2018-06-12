import * as React from 'react';
import { RaceStats } from './RaceStats';
import { downloadRacesFactory } from './network/downloadRacesFactory';

export const RaceStatsFactory = () =>
  <RaceStats downloadRaces={downloadRacesFactory} />;