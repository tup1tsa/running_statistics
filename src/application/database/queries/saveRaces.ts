import { Query } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig } from "../../config";

type SaveRaces = (
  getConfig: GetConfig,
  races: ReadonlyArray<Race>
) => Query<InsertWriteOpResult>;

export const saveRaces: SaveRaces = (getConfig, races) => db => {
  const collection = db.collection(getConfig().collections.races);
  // @ts-ignore
  // todo: fix
  return collection.insertMany(races);
};
