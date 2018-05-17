import { PositionInTime } from '../../client/src/common_files/interfaces';
import { Query } from './databaseWrappers';
import { Db, Collection } from 'mongodb';

export const saveRuns = (collectionName: string, runs: PositionInTime[][]): Query => {
  return (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    const runsWithType = runs.map(run => (
      {
        type: 'run',
        points: run
      }
    ));
    return collection.insertMany(runsWithType);
  };
};