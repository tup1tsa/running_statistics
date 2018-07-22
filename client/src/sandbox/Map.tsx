import * as React from 'react';
import { MapWrapperFactory } from '../factories/GoogleMap/MapWrapperFactory';
import Polyline from 'react-google-maps/lib/components/Polyline';

const path = [
  {lat: 48, lng: 23},
  {lat: 48.12, lng: 23.12}
];
const InnerElement = () => <Polyline path={path}/>;
const props = {
  center: {
    latitude: 48,
    longitude: 23,
  },
  zoom: 13,
  width: 400,
  height: 400
};
const MapSandbox = MapWrapperFactory(InnerElement);

export const Map = <MapSandbox {...props} />;