import * as React from 'react';
import { RaceStartPreparation } from './RaceStartPreparation';
import {
  runSettings,
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls,
  maximumTimeBetweenPointsSecs
} from './common_files/config';
import { saveRaceFactory } from './saveRaceFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RunStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    speedLimits={runSettings}
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={saveRaceFactory}
    setSaveResult={props.setSaveResult}
    maxTimeBetweenPointsSecs={maximumTimeBetweenPointsSecs}
  />
);