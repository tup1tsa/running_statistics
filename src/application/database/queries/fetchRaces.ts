import { Query } from "mongo-wrappers";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig } from "../../config";

type FetchRaces = (getConfig: GetConfig) => Query<ReadonlyArray<Race>>;

export const fetchRaces: FetchRaces = getConfig => async db => {
  const collection = db.collection(getConfig().collections.races);
  const cursor = await collection.find();
  return await cursor.toArray();
};
