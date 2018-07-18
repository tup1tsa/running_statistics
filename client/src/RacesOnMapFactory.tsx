import { RacesOnMap } from './RacesOnMap';
import { findCenter, getRacePart } from './Path/pathUtils';
import * as React from 'react';
import { divideRaceFactory, getRaceInfoFactory } from './Path/pathUtilsFactories';
import { Race } from './common_files/interfaces';

interface Props {
  races: Race[];
  size: {
    width: number;
    height: number;
  };
}

export const RacesOnMapFactory = (props: Props) => (
  <RacesOnMap
    size={props.size}
    races={props.races}
    activeColor={'black'}
    inactiveColor={'red'}
    findCenter={findCenter}
    divideRace={divideRaceFactory}
    getRaceInfo={getRaceInfoFactory}
    getRacePart={getRacePart}
  />
);