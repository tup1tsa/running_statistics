import * as React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps
} from 'react-google-maps';
import { Position } from '../Path/PathWatcher';

interface MapProps {
  center: Position;
  zoom: number;
}

interface MapSize {
  width: number;
  height: number;
}

interface ScriptProps {
  googleMapDefaultUrl: string;
  processEnv: {
    REACT_APP_GOOGLE_MAPS_KEY: string | undefined;
  };
}

export const MapWrapper = <P extends {}>
  (
    WrappedComponent: React.ComponentType<P>,
    mapProps: MapProps
  ) => (props: P) => {
    const center = {
      lat: mapProps.center.latitude,
      lng: mapProps.center.longitude
    };
    return (
      <GoogleMap
        defaultCenter={center}
        defaultZoom={mapProps.zoom}
      >
        <WrappedComponent {...props} />
      </GoogleMap>
    );
  };

export const MapWrapperWithGoogleMap = <P extends {}>
  (
    WrappedComponent: React.ComponentType<P>,
    mapSize: MapSize
  ) => {
    const Hoc = withGoogleMap(WrappedComponent) as React.ComponentClass<WithGoogleMapProps>;
    const containerStyle = {
      height: `${mapSize.height}px`,
      width: `${mapSize.width}px`
    };
    return class  extends React.Component {
      render() {
        return (
          <Hoc
            containerElement={<div style={containerStyle}/>}
            mapElement={<div style={{height: '100%'}}/>}
          />
        );
      }
    };
};

export const MapWrapperWithScript = <P extends {}>
  (
    WrappedComponent: React.ComponentClass<P>,
    props: ScriptProps
  ) => {
    let secretKey;
    if (props.processEnv.REACT_APP_GOOGLE_MAPS_KEY) {
      secretKey = props.processEnv.REACT_APP_GOOGLE_MAPS_KEY;
    }
    let url = secretKey ? `${props.googleMapDefaultUrl}&key=${secretKey}` : props.googleMapDefaultUrl;
    const Hoc = withScriptjs(WrappedComponent) as React.ComponentClass<WithScriptjsProps>;
    return () => (
      <Hoc
        googleMapURL={url}
        loadingElement={<div style={{height: '100%'}} />}
      />
    );
};
