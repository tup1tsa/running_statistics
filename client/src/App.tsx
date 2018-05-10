import * as React from 'react';
import './App.css';
import { PathFetcherFactory } from './Path/PathFetcherFactory';
import { saveRunFactory } from './saveRunFactory';

const App = () => (
  <PathFetcherFactory
    minimumDistanceDiff={10}
    minimumTimeBetweenCalls={10000}
    saveRun={saveRunFactory}
  />
);

export default App;
