import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { Query } from "../databaseWrappers";

type SaveRaces = (
  collectionName: string,
  races: ReadonlyArray<Race>
) => Query<InsertWriteOpResult>;

export const saveRaces: SaveRaces = (collectionName, races) => db => {
  const collection = db.collection(collectionName);
  // @ts-ignore
  // todo: fix
  return collection.insertMany(races);
};
