import * as React from 'react';
import { RaceStartPreparation } from './RaceStartPreparation';
import {
  raceSettings,
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls,
  maximumTimeBetweenPointsSecs
} from './common_files/config';
import { saveRaceFactory } from './saveRaceFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RaceStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    speedLimits={raceSettings}
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={saveRaceFactory}
    setSaveResult={props.setSaveResult}
    maxTimeBetweenPointsSecs={maximumTimeBetweenPointsSecs}
  />
);