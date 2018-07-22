import { sendRaces } from '../../application/network/sendRaces';
import axios from 'axios';
import { Race } from '../../application/common_files/interfaces';

export const sendRacesFactory = (races: Race[]) => sendRaces(races, axios);