import * as React from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Position  {
    timestamp: number;
    coords: Coordinates;
}

interface Props {}

interface State {
    latitude: number;
    longitude: number;
    lastTimeCheck: number;
}

export class Location extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
          latitude: 0,
          longitude: 0,
          lastTimeCheck: 0
        };
    }

    componentDidMount() {
      const success = (position: Position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          lastTimeCheck: position.timestamp
        });
      };
      // watch triggers around every 10 secs
      navigator.geolocation.watchPosition(success, () => null, {enableHighAccuracy: true});
    }

    render() {
      const lastTimeCheck = new Date(this.state.lastTimeCheck).toLocaleTimeString();
      return (
        <div>
          <p>Latitude is {this.state.latitude}</p>
          <p>Longitude is {this.state.longitude}</p>
          <p>Last checked {lastTimeCheck}</p>
        </div>
      );
    }
}