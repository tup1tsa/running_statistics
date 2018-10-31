import * as React from "react";
import {
  delayBetweenGeoCalls,
  minimumDistanceDiffBetweenPositions
} from "../application/common_files/config";
import { RaceStartPreparation } from "../application/RaceStartPreparation";
import { finishRaceFactory } from "./finishRaceFactory";

interface Props {
  readonly setSaveResult: (message: string) => void;
}

export const RaceStartPreparationFactory = (props: Props) => (
  <RaceStartPreparation
    minimumDistanceDiff={minimumDistanceDiffBetweenPositions}
    delaySecs={delayBetweenGeoCalls}
    saveRace={finishRaceFactory}
    setSaveResult={props.setSaveResult}
  />
);
