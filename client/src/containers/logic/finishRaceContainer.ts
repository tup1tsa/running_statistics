import { Race } from "../../application/common_files/interfaces";
import { validatePath } from "../../application/common_files/validators/validatePath";
import { finishRace } from "../../application/logic/finishRace";
import { sendRacesContainer } from "./network/sendRacesContainer";
import { deleteRacesContainer } from "./storage/deleteRacesContainer";
import { fetchRacesContainer } from "./storage/fetchRacesContainer";
import { saveRaceContainer } from "./storage/saveRaceContainer";

export type FinishRaceContainer = (race: Race) => Promise<string>;

export const finishRaceContainer: FinishRaceContainer = race =>
  finishRace(
    race,
    saveRaceContainer,
    fetchRacesContainer,
    deleteRacesContainer,
    validatePath,
    sendRacesContainer
  );
