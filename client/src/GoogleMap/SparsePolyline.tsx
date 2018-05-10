import * as React from 'react';
import { Polyline } from 'react-google-maps';
import { Position } from '../Path/PathWatcher';

interface PathPart {
  positions: Position[];
  color: string;
}

interface Props {
  path: PathPart[];
}

export const SparsePolyline = (props: Props) => {
  const polylines = props.path.
    map((pathPart, pathPartNumber) => {
      const positions = pathPart.positions.map(position => {
        return {
          lat: position.latitude,
          lng: position.longitude
        };
      });
      return <Polyline path={positions} key={pathPartNumber} options={{strokeColor: pathPart.color}} />;
    });
  return <>{polylines}</>;
};