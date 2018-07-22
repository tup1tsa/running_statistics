import { RacesOnMap } from '../application/RacesOnMap';
import { findCenter, getRacePart } from '../application/Path/pathUtils';
import * as React from 'react';
import { divideRaceFactory, getRaceInfoFactory } from './Path/pathUtilsFactories';
import { Race } from '../application/common_files/interfaces';

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