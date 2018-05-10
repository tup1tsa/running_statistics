import * as React from 'react';
import './App.css';
import { PathWatcherFactory } from './Path/PathWatcherFactory';
import { saveRunFactory } from './saveRunFactory';

const App = () => (
  <PathWatcherFactory
    minimumDistanceDiff={10}
    minimumTimeBetweenCalls={10000}
    saveRun={saveRunFactory}
  />
);

export default App;
