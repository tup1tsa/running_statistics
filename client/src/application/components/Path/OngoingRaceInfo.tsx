import React from "react";
import { Race } from "../../common_files/interfaces";
import { GetRaceInfo, getRaceInfo } from "../../logic/path/getRaceInfo";
import { GetLocalTime, getLocalTime } from "../../logic/time/getLocalTime";
import {
  HumanizeDuration,
  humanizeDuration
} from "../../logic/time/humanizeDuration";
import { RaceInformation } from "./RaceInformation";

interface StateProps {
  readonly race: Race;
  readonly lastTimeCheck: number;
}

type AllProps = StateProps & {
  readonly getRaceInfo: GetRaceInfo;
  readonly toLocaleTime: GetLocalTime;
  readonly humanizeDuration: HumanizeDuration;
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
    toLocaleTime={getLocalTime}
    humanizeDuration={humanizeDuration}
    getRaceInfo={getRaceInfo}
  />
);
