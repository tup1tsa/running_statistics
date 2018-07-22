import axios from 'axios';
import { downloadRaces } from '../../application/network/downloadRaces';
import { validatePath } from '../../application/common_files/validatePath';

export const downloadRacesFactory = () => downloadRaces(axios, validatePath);