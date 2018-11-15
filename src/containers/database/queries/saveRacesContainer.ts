import { runQueryContainer } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { saveRaces } from "../../../application/database/queries/saveRaces";

type SaveRacesContainer = (
  races: ReadonlyArray<Race>
) => Promise<InsertWriteOpResult>;

export const saveRacesContainer: SaveRacesContainer = async races =>
  runQueryContainer(saveRaces("races", races));
