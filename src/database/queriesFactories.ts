import { PositionInTime } from '../../client/src/common_files/interfaces';
import { saveRuns } from './queries';
import { runQuery } from './databaseWrappers';
import { MongoClient } from 'mongodb';

export const saveRuns = async (runs: PositionInTime[][]) => {
  const query = saveRuns('runs', runs);
  return runQuery(process.env, MongoClient, query);
};