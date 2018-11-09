import * as React from "react";
import { MapWrapperFactory } from "../../containers/components/GoogleMap/MapWrapperFactory";
import { DivideRaceContainer } from "../../containers/logic/path/divideRaceContainer";
import { divideRaceContainer } from "../../containers/logic/path/divideRaceContainer";
import { GetRaceInfoContainer } from "../../containers/logic/path/getRaceInfoContainer";
import { getRaceInfoContainer } from "../../containers/logic/path/getRaceInfoContainer";
import { Race } from "../common_files/interfaces";
import {
  RacesOnMapDispatchProps,
  RacesOnMapStateProps
} from "../components/RacesOnMap";
import { FindCenter } from "../logic/path/findCenter";
import { findCenter } from "../logic/path/findCenter";
import { GetRacePart } from "../logic/path/getRacePart";
import { getRacePart } from "../logic/path/getRacePart";
import { SortRacesByDate } from "../logic/path/sortRacesByDate";
import { sortRacesByDate } from "../logic/path/sortRacesByDate";
import { SparsePolyline } from "./GoogleMap/SparsePolyline";

export interface RacesOnMapStateProps {
  readonly races: ReadonlyArray<Race>;
  readonly currentRaceIndex: number;
  readonly partialRaceStart: number;
  readonly partialRaceFinish: number;
}

export interface RacesOnMapMiscProps {
  readonly size: {
    readonly width: number;
    readonly height: number;
  };
  readonly activeColor: string;
  readonly inactiveColor: string;
  readonly findCenter: FindCenter;
  readonly divideRace: DivideRaceContainer;
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly getRacePart: GetRacePart;
  readonly sortRacesByDate: SortRacesByDate;
}

export interface RacesOnMapDispatchProps {
  readonly incrementRace: () => void;
  readonly decrementRace: () => void;
}

type FactoryProps = RacesOnMapStateProps &
  RacesOnMapDispatchProps &
  RacesOnMapMiscProps;

export const RacesOnMapFactory = (props: FactoryProps) => {
  const sortedRaces = props.sortRacesByDate(props.races);
  const wholeRace = sortedRaces[props.currentRaceIndex];
  const currentRace = props.getRacePart(
    wholeRace,
    props.partialRaceStart,
    props.partialRaceFinish
  );
  const dividedRace = props.divideRace(currentRace);
  const pathWithColors = dividedRace.map(racePart => {
    const color = racePart.active ? props.activeColor : props.inactiveColor;
    return {
      positions: racePart.path,
      color
    };
  });
  const mapProps = {
    width: props.size.width,
    height: props.size.height,
    center: props.findCenter(currentRace.path),
    zoom: 12
  };
  const Map = MapWrapperFactory(SparsePolyline);
  const buttons = (
    <>
      <button type="button" id="previous_race" onClick={props.decrementRace}>
        Previous race
      </button>
      <button type="button" id="next_race" onClick={props.incrementRace}>
        Next race
      </button>
    </>
  );
  return (
    <div>
      <Map path={pathWithColors} {...mapProps} />
      <div
        style={{
          marginLeft: "5%",
          float: "left",
          width: "5%",
          height: props.size.height / 5
        }}
      />
      <div style={{ clear: "both" }} />
      <div id="info">finished race info stub</div>
      {props.races.length > 1 ? buttons : null}
    </div>
  );
};

type Props = RacesOnMapDispatchProps & RacesOnMapStateProps;

export default (props: Props) => (
  <RacesOnMapFactory
    size={{ width: 1000, height: 1000 }}
    activeColor="black"
    inactiveColor="red"
    findCenter={findCenter}
    divideRace={divideRaceContainer}
    getRaceInfo={getRaceInfoContainer}
    getRacePart={getRacePart}
    sortRacesByDate={sortRacesByDate}
    {...props}
  />
);
