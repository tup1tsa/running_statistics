import React from "react";
import { Race } from "../common_files/interfaces";
import {
  RacesOnMapDispatchProps,
  RacesOnMapStateProps
} from "../components/RacesOnMap";
import { DivideRace, divideRace } from "../logic/path/divideRace";
import { findCenter } from "../logic/path/findCenter";
import { FindCenter } from "../logic/path/findCenter";
import { GetRaceInfo, getRaceInfo } from "../logic/path/getRaceInfo";
import { getRacePart } from "../logic/path/getRacePart";
import { GetRacePart } from "../logic/path/getRacePart";
import { SortRacesByDate } from "../logic/path/sortRacesByDate";
import { sortRacesByDate } from "../logic/path/sortRacesByDate";
import MapWrapper from "./GoogleMap/MapWrapper";
import { SparsePolyline } from "./GoogleMap/SparsePolyline";
import FinishedRaceInfo from "./Path/FinishedRaceInfo";

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
  readonly divideRace: DivideRace;
  readonly getRaceInfo: GetRaceInfo;
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
  const Map = MapWrapper(SparsePolyline);
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
      <FinishedRaceInfo race={currentRace} />
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
    divideRace={divideRace}
    getRaceInfo={getRaceInfo}
    getRacePart={getRacePart}
    sortRacesByDate={sortRacesByDate}
    {...props}
  />
);
