import { Race } from "../../../client/src/application/common_files/interfaces";
import { runQuery } from "../../server/database/databaseWrappers";
import { getConnectionInfo } from "../../server/database/getConnectionInfo";
import { fetchRaces, saveRaces } from "../../server/database/queries";

export const saveRacesContainer = async (races: ReadonlyArray<Race>) => {
  const query = saveRaces("races", races);
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};

export const fetchRacesContainer = async () => {
  const query = await fetchRaces("races");
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};
