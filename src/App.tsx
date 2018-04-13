import * as React from 'react';
import './App.css';
import { PathFetcher } from './Path/PathFetcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from './Path/isMiddlePointAccurate';

const appProps = {
  geoLocation: navigator.geolocation,
  getDistance: GeoLib.getDistance,
  isMiddlePointAccurate,
  options: {
    minimumTimeBetweenCalls: 10000,
    minimumDistanceDiff: 10
  }
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PathFetcher {...appProps} />
      </div>
    );
  }
}

export default App;
