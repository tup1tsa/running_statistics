import * as React from 'react';
import { RaceStartPreparation } from '../application/RaceStartPreparation';
import {
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls
} from '../application/common_files/config';
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