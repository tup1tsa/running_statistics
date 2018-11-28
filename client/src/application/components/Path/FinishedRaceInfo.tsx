import React from "react";
import { Race } from "../../common_files/interfaces";
import { GetRaceInfo, getRaceInfo } from "../../logic/path/getRaceInfo";
import {
  GetReadableDate,
  getReadableDate
} from "../../logic/time/getReadableDate";
import {
  HumanizeDuration,
  humanizeDuration
} from "../../logic/time/humanizeDuration";
import { RaceInformation } from "./RaceInformation";

interface FactoryProps {
  readonly race: Race;
  readonly getRaceInfo: GetRaceInfo;
  readonly toLocaleDate: GetReadableDate;
  readonly humanizeDuration: HumanizeDuration;
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
    toLocaleDate={getReadableDate}
    humanizeDuration={humanizeDuration}
    getRaceInfo={getRaceInfo}
  />
);
