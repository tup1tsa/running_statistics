import { PositionInTime } from '../../client/src/common_files/interfaces';
import { Query } from './databaseWrappers';
import { Db, Collection, InsertWriteOpResult } from 'mongodb';

export const saveRuns = (collectionName: string, runs: PositionInTime[][]): Query<InsertWriteOpResult> => {
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

export const fetchRuns = (collectionName: string): Query<PositionInTime[][]> => {
  return async (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    const cursor = await collection.find();
    const runs = await cursor.toArray();
    return runs.map(run => {
      return run.points;
    });
  };
};