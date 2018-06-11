import * as React from 'react';
import { RaceStartPreparation } from './RaceStartPreparation';
import {
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls
} from './common_files/config';
import { finishRaceFactory } from './finishRaceFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RaceStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={finishRaceFactory}
    setSaveResult={props.setSaveResult}
  />
);