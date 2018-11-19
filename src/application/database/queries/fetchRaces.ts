import { Query, runQueryContainer } from "mongo-wrappers";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig, getConfig } from "../../config";

export type FetchRaces = (userId: string) => Promise<ReadonlyArray<Race>>;
type FetchRacesFactory = (
  getConfigFunc: GetConfig,
  userId: string
) => Query<ReadonlyArray<Race>>;

export const fetchRacesFactory: FetchRacesFactory = (
  getConfigFunc,
  userId
) => async db => {
  const collection = db.collection(getConfigFunc().collections.races);
  const cursor = await collection.find({ userId });
  const dbRaces = await cursor.toArray();
  return dbRaces.map(dbRace => ({ path: dbRace.path, type: dbRace.type }));
};

export const fetchRaces: FetchRaces = userId =>
  runQueryContainer(fetchRacesFactory(getConfig, userId));
