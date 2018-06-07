import { sendRaces } from './sendRaces';
import axios from 'axios';
import { Race } from '../common_files/interfaces';

export const sendRacesFactory = (races: Race[]) => sendRaces(races, axios);