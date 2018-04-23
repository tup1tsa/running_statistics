import { Running } from './Running';
import axios from 'axios';
import * as React from 'react';

export const RunningFactory = () => <Running axios={axios} localStorage={localStorage} />;