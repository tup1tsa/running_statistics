import * as React from "react";
import {
  GetRaceInfoContainer,
  getRaceInfoContainer
} from "../../../containers/logic/path/getRaceInfoContainer";
import {
  GetReadableDateContainer,
  getReadableDateContainer,
  HumanizeDurationContainer,
  humanizeDurationContainer
} from "../../../containers/logic/utilsContainers";
import { Race } from "../../common_files/interfaces";
import { RaceInformation } from "./RaceInformation";

interface FactoryProps {
  readonly race: Race;
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly toLocaleDate: GetReadableDateContainer;
  readonly humanizeDuration: HumanizeDurationContainer;
}

interface Props {
  readonly race: Race;
}

export const FinishedRaceInfoFactory = (props: FactoryProps) => {
  const raceInfo = props.getRaceInfo(props.race);
  return (
    <ul>
      <li>Date: {props.toLocaleDate(props.race.path[0].time)}</li>
      <li>Race type: {props.race.type}</li>
      <RaceInformation
        totalDistance={raceInfo.distance}
        totalTimeSecs={raceInfo.timeSecs}
        avgSpeed={raceInfo.averageSpeed}
        humanizeDuration={props.humanizeDuration}
      />
    </ul>
  );
};

export default (props: Props) => (
  <FinishedRaceInfoFactory
    {...props}
    toLocaleDate={getReadableDateContainer}
    humanizeDuration={humanizeDurationContainer}
    getRaceInfo={getRaceInfoContainer}
  />
);
