import React from "react";
import { Polyline } from "react-google-maps";
import { Coordinates } from "running_app_core";

interface PathPart {
  readonly positions: ReadonlyArray<Coordinates>;
  readonly color: string;
}

interface Props {
  readonly path: ReadonlyArray<PathPart>;
}

export const SparsePolyline = (props: Props) => {
  const polylines = props.path.map((pathPart, pathPartNumber) => {
    const positions = pathPart.positions.map(position => {
      return {
        lat: position.latitude,
        lng: position.longitude
      };
    });
    return (
      <Polyline
        path={positions}
        key={pathPartNumber}
        options={{ strokeColor: pathPart.color }}
      />
    );
  });
  return <>{polylines}</>;
};
