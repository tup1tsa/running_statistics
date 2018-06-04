import * as React from 'react';
import { RunStartPreparation } from './RunStartPreparation';
import { runSettings } from './common_files/config';
import { saveRunFactory } from './saveRunFactory';

interface Props {
  setSaveResult: (message: string) => void;
}

export const RunStartPreparationFactory = (props: Props) => (
  <RunStartPreparation
    speedLimits={runSettings}
    minimumDistanceDiff={10}
    delaySecs={10}
    saveRun={saveRunFactory}
    setSaveResult={props.setSaveResult}
  />
);