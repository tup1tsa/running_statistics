import { google } from "google-maps";
import * as React from "react";
import { Position } from "../application/common_files/interfaces";
declare var google: google;

interface DefaultProps {
  readonly center: Position;
  readonly zoom: number;
}

const GoogleMapHoc = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  defaultProps: DefaultProps
) => {
  return (internalProps: P) => {
    return (
      <div {...defaultProps}>
        <WrappedComponent {...internalProps} />
      </div>
    );
  };
};

interface SpecificProps {
  readonly path: ReadonlyArray<Position>;
}

const InsideElement = (props: SpecificProps) => (
  <div data-path={JSON.stringify(props.path)} />
);

const mapDefaultProps: DefaultProps = {
  center: {
    latitude: 23,
    longitude: 44
  },
  zoom: 23
};
const HOC = GoogleMapHoc(InsideElement, mapDefaultProps);
export { HOC };
