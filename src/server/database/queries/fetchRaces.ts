import { Race } from "../../../../client/src/application/common_files/interfaces";
import { Query } from "../databaseWrappers";

type FetchRaces = (collectionName: string) => Query<ReadonlyArray<Race>>;

export const fetchRaces: FetchRaces = collectionName => async db => {
  const collection = db.collection(collectionName);
  const cursor = await collection.find();
  return await cursor.toArray();
};
