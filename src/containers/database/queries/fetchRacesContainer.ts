import { runQueryContainer } from "mongo-wrappers";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { appConfig } from "../../../application/config";
import { fetchRaces } from "../../../application/database/queries/fetchRaces";

type FetchRacesContainer = () => Promise<ReadonlyArray<Race>>;

export const fetchRacesContainer: FetchRacesContainer = async () =>
  runQueryContainer(fetchRaces(appConfig));
