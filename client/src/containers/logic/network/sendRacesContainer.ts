import axios from "axios";
import { Race } from "../../../application/common_files/interfaces";
import { sendRaces } from "../../../application/logic/network/sendRaces";

export const sendRacesContainer = (races: ReadonlyArray<Race>) =>
  sendRaces(races, axios);
