import * as React from 'react';
import { RunStartPreparation } from './RunStartPreparation';
import {
  runSettings,
  minimumDistanceDiffBetweenPositions,
  delayBetweenGeoCalls,
  maximumTimeBetweenPointsSecs
} from './common_files/config';
import { saveRunFactory } from './saveRunFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RunStartPreparationFactory = (props: Props) => (
  <RunStartPreparation
    speedLimits={runSettings}
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRun={saveRunFactory}
    setSaveResult={props.setSaveResult}
    maxTimeBetweenPointsSecs={maximumTimeBetweenPointsSecs}
  />
);