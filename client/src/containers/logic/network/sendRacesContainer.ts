import axios from "axios";
import { Race } from "../../../application/common_files/interfaces";
import { sendRaces } from "../../../application/logic/network/sendRaces";

export type SendRacesContainer = (
  races: ReadonlyArray<Race>
) => Promise<boolean>;

export const sendRacesContainer: SendRacesContainer = races =>
  sendRaces(races, axios);
