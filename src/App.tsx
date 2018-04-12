import * as React from 'react';
import './App.css';
import { PathFetcher } from './Path/PathFetcher';
import * as GeoLib from 'geolib';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PathFetcher geoLocation={navigator.geolocation} getPath={GeoLib.getPathLength}/>
      </div>
    );
  }
}

export default App;
