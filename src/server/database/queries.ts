import { Race } from '../../../client/src/common_files/interfaces';
import { Query } from './databaseWrappers';
import { Db, Collection, InsertWriteOpResult } from 'mongodb';

export const saveRaces = (collectionName: string, races: Race[]): Query<InsertWriteOpResult> => {
  return (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    return collection.insertMany(races);
  };
};

export const fetchRaces = (collectionName: string): Query<Race[]> => {
  return async (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    const cursor = await collection.find();
    return await cursor.toArray();
  };
};