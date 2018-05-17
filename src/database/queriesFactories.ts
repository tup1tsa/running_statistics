import { PositionInTime } from '../../client/src/common_files/interfaces';
import { fetchRuns, saveRuns } from './queries';
import { runQuery } from './databaseWrappers';
import { getConnectionInfo } from './getConnectionInfo';

export const saveRunsFactory = async (runs: PositionInTime[][]) => {
  const query = saveRuns('runs', runs);
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};

export  const fetchRunsFactory = async () => {
  const query = await fetchRuns('runs');
  const connectionInfo = getConnectionInfo(process.env);
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};