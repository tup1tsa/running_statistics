import { Query, runQueryContainer } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig, getConfig } from "../../config";

type SaveRacesFactory = (
  getConfig: GetConfig,
  races: ReadonlyArray<Race>,
  userId: string
) => Query<InsertWriteOpResult>;
export type SaveRaces = (
  races: ReadonlyArray<Race>,
  userId: string
) => Promise<InsertWriteOpResult>;

export const saveRacesFactory: SaveRacesFactory = (
  getConfigFunc,
  races,
  userId
) => db => {
  const collection = db.collection(getConfigFunc().collections.races);
  const racesWithUserId = races.map(race => ({ ...race, userId }));
  return collection.insertMany(racesWithUserId);
};

export const saveRaces: SaveRaces = (races, userId) =>
  runQueryContainer(saveRacesFactory(getConfig, races, userId));
