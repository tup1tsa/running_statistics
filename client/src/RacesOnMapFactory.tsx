import { RacesOnMap } from './RacesOnMap';
import { DividedPathPart, findCenter, unitePath } from './Path/pathUtils';
import * as React from 'react';

interface Props {
  races: DividedPathPart[][];
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
    unitePath={unitePath}
  />
);