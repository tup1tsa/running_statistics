import * as React from "react";
import { Race } from "../../application/common_files/interfaces";
import { RacesOnMap } from "../../application/components/RacesOnMap";
import { findCenter } from "../../application/logic/path/findCenter";
import { getRacePart } from "../../application/logic/path/getRacePart";
import { divideRaceContainer } from "../logic/path/divideRaceContainer";
import { getRaceInfoContainer } from "../logic/path/getRaceInfoContainer";

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
