import * as React from "react";
import {
  delayBetweenGeoCalls,
  minimumDistanceDiffBetweenPositions
} from "../../application/common_files/config";
import { RaceStartPreparation } from "../../application/components/RaceStartPreparation";
import { finishRaceContainer } from "../logic/finishRaceContainer";

interface Props {
  readonly setSaveResult: (message: string) => void;
}

export const RaceStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={finishRaceContainer}
    setSaveResult={props.setSaveResult}
  />
);
