import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs
} from "react-google-maps";
import { Coordinates } from "../../common_files/interfaces";

interface MapProps {
  readonly center: Coordinates;
  readonly zoom: number;
}

interface MapSize {
  readonly width: number;
  readonly height: number;
}

interface ScriptProps {
  readonly googleMapDefaultUrl: string;
  readonly processEnv: {
    readonly REACT_APP_GOOGLE_MAPS_KEY: string | undefined;
  };
}

interface ContainerProps {
  readonly center: Coordinates;
  readonly zoom: number;
  readonly width: number;
  readonly height: number;
}

export const MapWrapper = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => (props: P & MapProps) => {
  const center = {
    lat: props.center.latitude,
    lng: props.center.longitude
  };
  const wrappedComponentProps = props as P;
  // wrapped component props include map props too, but it doesn't matter
  return (
    <GoogleMap defaultCenter={center} defaultZoom={props.zoom}>
      <WrappedComponent {...wrappedComponentProps} />
    </GoogleMap>
  );
};

export const MapWrapperWithGoogleMap = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P & MapSize> {
    constructor(props: P & MapSize) {
      super(props);
    }
    public render() {
      const Hoc = withGoogleMap(WrappedComponent) as React.ComponentClass<
        P & WithGoogleMapProps
      >;
      const containerStyle = {
        height: `${this.props.height}px`,
        width: `${this.props.width}px`
      };
      return (
        // @ts-ignore
        <Hoc
          {...this.props}
          containerElement={
            <div style={{ ...containerStyle, float: "left" }} />
          }
          mapElement={<div style={{ height: "100%" }} />}
        />
      );
    }
  };
};

export const MapWrapperWithScript = <P extends {}>(
  WrappedComponent: React.ComponentClass<P>
) => (props: P & ScriptProps) => {
  let secretKey;
  if (props.processEnv.REACT_APP_GOOGLE_MAPS_KEY) {
    secretKey = props.processEnv.REACT_APP_GOOGLE_MAPS_KEY;
  }
  const url = secretKey
    ? `${props.googleMapDefaultUrl}&key=${secretKey}`
    : props.googleMapDefaultUrl;
  const Hoc = withScriptjs(WrappedComponent);
  return (
    // @ts-ignore
    <Hoc
      {...props}
      googleMapURL={url}
      loadingElement={<div style={{ height: "100%" }} />}
    />
  );
};

export default <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const MapComponent = MapWrapper(WrappedComponent);
  const MapComponentWithGoogleMap = MapWrapperWithGoogleMap(MapComponent);
  const secretKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const scriptProps = {
    googleMapDefaultUrl:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    processEnv: {
      REACT_APP_GOOGLE_MAPS_KEY: secretKey
    }
  };
  const ComponentWithScript = MapWrapperWithScript(MapComponentWithGoogleMap);
  return (props: ContainerProps & P) => (
    <ComponentWithScript {...scriptProps} {...props} />
  );
};
