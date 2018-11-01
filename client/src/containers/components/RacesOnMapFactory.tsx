import * as React from "react";
import { Race } from "../../application/common_files/interfaces";
import { RacesOnMap } from "../../application/components/RacesOnMap";
import { findCenter, getRacePart } from "../../application/logic/pathUtils";
import {
  divideRaceContainer,
  getRaceInfoContainer
} from "../logic/pathUtilsContainers";

interface Props {
  readonly races: ReadonlyArray<Race>;
  readonly size: {
    readonly width: number;
    readonly height: number;
  };
}

export const RacesOnMapFactory = (props: Props) => (
  <RacesOnMap
    size={props.size}
    races={props.races}
    activeColor={"black"}
    inactiveColor={"red"}
    findCenter={findCenter}
    divideRace={divideRaceContainer}
    getRaceInfo={getRaceInfoContainer}
    getRacePart={getRacePart}
  />
);
