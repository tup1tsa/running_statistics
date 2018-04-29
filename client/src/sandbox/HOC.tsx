import { Position } from '../Path/PathFetcher';
import * as React from 'react';
import { google } from 'google-maps';
declare var google: google;

interface DefaultProps {
  center: Position;
  zoom: number;
}

const GoogleMapHoc = <P extends {}>(WrappedComponent: React.ComponentType<P>, defaultProps: DefaultProps) => {
  return (internalProps: P) => {
    return (
      <div {...defaultProps} >
        <WrappedComponent {...internalProps} />
      </div>
    );
  };
};

interface SpecificProps {
  path: Position[];
}

const InsideElement = (props: SpecificProps) => <div data-path={JSON.stringify(props.path)} />;

const mapDefaultProps: DefaultProps = {
  center: {
    latitude: 23,
    longitude: 44
  },
  zoom: 23
};
const HOC = GoogleMapHoc(InsideElement, mapDefaultProps);
export { HOC };