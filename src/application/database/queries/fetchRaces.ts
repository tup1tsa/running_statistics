import { Query, runQueryContainer } from "mongo-wrappers";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig, getConfig } from "../../config";

type FetchRaces = () => Promise<ReadonlyArray<Race>>;
type FetchRacesFactory = (
  getConfigFunc: GetConfig
) => Query<ReadonlyArray<Race>>;

export const fetchRacesFactory: FetchRacesFactory = getConfigFunc => async db => {
  const collection = db.collection(getConfigFunc().collections.races);
  const cursor = await collection.find();
  return await cursor.toArray();
};

export const fetchRaces: FetchRaces = () =>
  runQueryContainer(fetchRacesFactory(getConfig));
