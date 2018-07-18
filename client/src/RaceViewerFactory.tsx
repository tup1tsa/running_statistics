import * as React from 'react';
import { RaceViewer } from './RaceViewer';
import { downloadRacesFactory } from './network/downloadRacesFactory';

export const RaceViewerFactory = () =>
  <RaceViewer downloadRaces={downloadRacesFactory} />;