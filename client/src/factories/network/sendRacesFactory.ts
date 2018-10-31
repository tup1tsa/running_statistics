import axios from "axios";
import { Race } from "../../application/common_files/interfaces";
import { sendRaces } from "../../application/network/sendRaces";

export const sendRacesFactory = (races: ReadonlyArray<Race>) =>
  sendRaces(races, axios);
