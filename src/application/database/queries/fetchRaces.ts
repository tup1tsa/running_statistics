import { Query } from "mongo-wrappers";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { Config } from "../../config";

type FetchRaces = (config: Config) => Query<ReadonlyArray<Race>>;

export const fetchRaces: FetchRaces = config => async db => {
  const collection = db.collection(config.collections.races);
  const cursor = await collection.find();
  return await cursor.toArray();
};
