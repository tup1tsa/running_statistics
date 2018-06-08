import * as React from 'react';
import { RaceStartPreparation } from './RaceStartPreparation';
import {
  raceSettings,
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls
} from './common_files/config';
import { finishRaceFactory } from './finishRaceFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RaceStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    speedLimits={raceSettings}
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={finishRaceFactory}
    setSaveResult={props.setSaveResult}
    // todo: move maxTimeBetween points sec somewhere (it's inside raceSettings)
    maxTimeBetweenPointsSecs={raceSettings.running.maximumTimeBetweenPointsSecs}
  />
);