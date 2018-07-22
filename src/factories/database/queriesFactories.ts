import { Race } from '../../../client/src/common_files/interfaces';
import { fetchRaces, saveRaces } from '../../server/database/queries';
import { runQuery } from '../../server/database/databaseWrappers';
import { getConnectionInfo } from '../../server/database/getConnectionInfo';

export const saveRacesFactory = async (races: Race[]) => {
  const query = saveRaces('races', races);
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};

export  const fetchRacesFactory = async () => {
  const query = await fetchRaces('races');
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};