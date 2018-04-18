import * as React from 'react';
import './App.css';
import { PathFetcherFactory } from './Path/PathFetcherFactory';

const sendPositions = () => undefined;

class App extends React.Component {
  render() {
    return (
     <PathFetcherFactory
       minimumDistanceDiff={10}
       minimumTimeBetweenCalls={10000}
       sendPositions={sendPositions}
     />
    );
  }
}

export default App;
