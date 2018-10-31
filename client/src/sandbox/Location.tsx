import * as React from "react";

interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

interface Position {
  readonly timestamp: number;
  readonly coords: Coordinates;
}

interface State {
  readonly latitude: number;
  readonly longitude: number;
  readonly lastTimeCheck: number;
}

export class Location extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      lastTimeCheck: 0
    };
  }

  public componentDidMount() {
    const success = (position: Position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        lastTimeCheck: position.timestamp
      });
    };
    // watch triggers around every 10 secs
    navigator.geolocation.watchPosition(success, () => null, {
      enableHighAccuracy: true
    });
  }

  public render() {
    const lastTimeCheck = new Date(
      this.state.lastTimeCheck
    ).toLocaleTimeString();
    return (
      <div>
        <p>Latitude is {this.state.latitude}</p>
        <p>Longitude is {this.state.longitude}</p>
        <p>Last checked {lastTimeCheck}</p>
      </div>
    );
  }
}
