import { Race } from "../application/common_files/interfaces";
import { validatePath } from "../application/common_files/validatePath";
import { finishRace } from "../application/finishRace";
import { sendRacesFactory } from "./network/sendRacesFactory";
import { deleteRacesFactory } from "./storage/deleteRacesFactory";
import { fetchRacesFactory } from "./storage/fetchRacesFactory";
import { saveRaceFactory } from "./storage/saveRaceFactory";

export type FinishRaceFactory = (race: Race) => Promise<string>;

export const finishRaceFactory: FinishRaceFactory = race =>
  finishRace(
    race,
    saveRaceFactory,
    fetchRacesFactory,
    deleteRacesFactory,
    validatePath,
    sendRacesFactory
  );
