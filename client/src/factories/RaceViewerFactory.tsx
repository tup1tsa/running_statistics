import * as React from 'react';
import { RaceViewer } from '../application/RaceViewer';
import { downloadRacesFactory } from './network/downloadRacesFactory';

export const RaceViewerFactory = () =>
  <RaceViewer downloadRaces={downloadRacesFactory} />;