import { Collection, Db, InsertWriteOpResult } from "mongodb";
import { Race } from "../../../client/src/application/common_files/interfaces";
import { Query } from "./databaseWrappers";

export const saveRaces = (
  collectionName: string,
  races: ReadonlyArray<Race>
): Query<InsertWriteOpResult> => {
  return (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    // @ts-ignore
    // todo: fix
    return collection.insertMany(races);
  };
};

export const fetchRaces = (
  collectionName: string
): Query<ReadonlyArray<Race>> => {
  return async (db: Db) => {
    const collection: Collection = db.collection(collectionName);
    const cursor = await collection.find();
    return await cursor.toArray();
  };
};
