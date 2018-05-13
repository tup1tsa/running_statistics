import { PositionInTime } from '../../client/src/common_files/interfaces';
import { Db, Query } from './databaseWrappers';

export const getSaveRunQuery = (collectionName: string, runs: PositionInTime[][]): Query => {
  return (db: Db) => {
    const collection = db.collection(collectionName);
    const runsWithType = runs.map(run => (
      {
        type: 'run',
        points: run
      }
    ));
    return collection.insertMany(runsWithType);
  };
};