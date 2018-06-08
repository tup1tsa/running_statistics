import axios from 'axios';
import { downloadRaces } from './downloadRaces';
import { validatePath } from '../common_files/validatePath';

export const downloadRacesFactory = () => downloadRaces(axios, validatePath);