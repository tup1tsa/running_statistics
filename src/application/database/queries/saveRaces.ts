import { Query } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { Config } from "../../config";

type SaveRaces = (
  config: Config,
  races: ReadonlyArray<Race>
) => Query<InsertWriteOpResult>;

export const saveRaces: SaveRaces = (config, races) => db => {
  const collection = db.collection(config.collections.races);
  // @ts-ignore
  // todo: fix
  return collection.insertMany(races);
};
