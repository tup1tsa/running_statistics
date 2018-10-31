import * as React from "react";
import { Race } from "../application/common_files/interfaces";
import { findCenter, getRacePart } from "../application/Path/pathUtils";
import { RacesOnMap } from "../application/RacesOnMap";
import {
  divideRaceFactory,
  getRaceInfoFactory
} from "./Path/pathUtilsFactories";

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
    divideRace={divideRaceFactory}
    getRaceInfo={getRaceInfoFactory}
    getRacePart={getRacePart}
  />
);
