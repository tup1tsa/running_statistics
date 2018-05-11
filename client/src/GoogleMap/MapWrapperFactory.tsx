import {
  MapWrapper,
  MapWrapperWithScript,
  MapWrapperWithGoogleMap
} from './MapWrapper';
import * as React from 'react';
import { Position } from '../common_files/interfaces';

interface Props {
  map: {
    center: Position;
    zoom: number;
  };
  containerSize: {
    width: number;
    height: number;
  };
}

export const MapWrapperFactory = <P extends {}>(WrappedComponent: React.ComponentType<P>, props: Props) => {
  const MapComponent = MapWrapper(WrappedComponent, props.map);
  const MapComponentWithGoogleMap = MapWrapperWithGoogleMap(MapComponent, props.containerSize);
  const secretKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const scriptProps = {
    googleMapDefaultUrl: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    processEnv: {
      REACT_APP_GOOGLE_MAPS_KEY: secretKey
    }
  };
  return MapWrapperWithScript(MapComponentWithGoogleMap, scriptProps);
};