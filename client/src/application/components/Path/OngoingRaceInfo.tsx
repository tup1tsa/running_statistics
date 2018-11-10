import * as React from "react";
import {
  GetRaceInfoContainer,
  getRaceInfoContainer
} from "../../../containers/logic/path/getRaceInfoContainer";
import {
  GetLocalTimeContainer,
  getLocalTimeContainer,
  HumanizeDurationContainer,
  humanizeDurationContainer
} from "../../../containers/logic/utilsContainers";
import { Race } from "../../common_files/interfaces";
import { RaceInformation } from "./RaceInformation";

interface StateProps {
  readonly race: Race;
  readonly lastTimeCheck: number;
}

type AllProps = StateProps & {
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly toLocaleTime: GetLocalTimeContainer;
  readonly humanizeDuration: HumanizeDurationContainer;
};

export const OngoingRaceInfoFactory = (props: AllProps) => {
  const raceInfo = props.getRaceInfo(props.race);
  const [firstLetter, ...otherLetters] = props.race.type.split("");
  const raceTypeUppercase = firstLetter.toUpperCase() + otherLetters.join("");
  return (
    <ul>
      <li>Last time check was at {props.toLocaleTime(props.lastTimeCheck)}</li>
      <li>{raceTypeUppercase} is in progress</li>
      <RaceInformation
        totalDistance={raceInfo.distance}
        totalTimeSecs={raceInfo.timeSecs}
        avgSpeed={raceInfo.averageSpeed}
        humanizeDuration={props.humanizeDuration}
      />
      <li>Current speed: {raceInfo.averageSpeed} km/h</li>
    </ul>
  );
};

export default (props: StateProps) => (
  <OngoingRaceInfoFactory
    {...props}
    toLocaleTime={getLocalTimeContainer}
    humanizeDuration={humanizeDurationContainer}
    getRaceInfo={getRaceInfoContainer}
  />
);
