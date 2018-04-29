import * as React from 'react';
import { MapWrapperFactory } from '../GoogleMap/MapWrapperFactory';
import Polyline from 'react-google-maps/lib/components/Polyline';

const path = [
  {lat: 48, lng: 23},
  {lat: 48.12, lng: 23.12}
];
const InnerElement = () => <Polyline path={path}/>;
const props = {
  map: {
    center: {
      latitude: 48,
      longitude: 23,
    },
    zoom: 13
  },
  containerSize: {
    width: 400,
    height: 400
  }
};
export const MapSandbox = MapWrapperFactory(InnerElement, props);
// usage <MapSandbox />;