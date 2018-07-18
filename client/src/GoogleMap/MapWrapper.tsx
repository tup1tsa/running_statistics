import * as React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps
} from 'react-google-maps';
import { Position } from '../common_files/interfaces';

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
    WrappedComponent: React.ComponentType<P>
  ) => (props: P & MapProps) => {
    const center = {
      lat: props.center.latitude,
      lng: props.center.longitude
    };
    return (
      <GoogleMap
        defaultCenter={center}
        defaultZoom={props.zoom}
      >
        <WrappedComponent {...props} />
      </GoogleMap>
    );
  };

export const MapWrapperWithGoogleMap = <P extends {}>
  (
    WrappedComponent: React.ComponentType<P>
  ) => {
    return class  extends React.Component<P & MapSize> {
      constructor(props: P & MapSize) {
        super(props);
      }
      render() {
        const Hoc = withGoogleMap(WrappedComponent) as React.ComponentClass<WithGoogleMapProps>;
        const containerStyle = {
          height: `${this.props.height}px`,
          width: `${this.props.width}px`
        };
        return (
          <Hoc
            {...this.props}
            containerElement={<div style={{...containerStyle, float: 'left'}}/>}
            mapElement={<div style={{height: '100%'}}/>}
          />
        );
      }
    };
};

export const MapWrapperWithScript = <P extends {}>
  (
    WrappedComponent: React.ComponentClass<P>
  ) => (props: P & ScriptProps) => {
    let secretKey;
    if (props.processEnv.REACT_APP_GOOGLE_MAPS_KEY) {
      secretKey = props.processEnv.REACT_APP_GOOGLE_MAPS_KEY;
    }
    let url = secretKey ? `${props.googleMapDefaultUrl}&key=${secretKey}` : props.googleMapDefaultUrl;
    const Hoc = withScriptjs(WrappedComponent) as React.ComponentClass<WithScriptjsProps>;
    return (
      <Hoc
        {...props}
        googleMapURL={url}
        loadingElement={<div style={{height: '100%'}} />}
      />
    );
};
