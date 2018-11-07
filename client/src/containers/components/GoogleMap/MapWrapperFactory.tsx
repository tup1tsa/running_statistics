import * as React from "react";
import { Coordinates } from "../../../application/common_files/interfaces";
import {
  MapWrapper,
  MapWrapperWithGoogleMap,
  MapWrapperWithScript
} from "../../../application/components/GoogleMap/MapWrapper";

interface Props {
  readonly center: Coordinates;
  readonly zoom: number;
  readonly width: number;
  readonly height: number;
}

export const MapWrapperFactory = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => {
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
  return (props: Props & P) => (
    <ComponentWithScript {...scriptProps} {...props} />
  );
};
