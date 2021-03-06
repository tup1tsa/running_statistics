import { ObjectID } from "bson";
import { Query, runQueryContainer } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

type SaveRacesFactory = (
  getConfig: GetConfig,
  races: ReadonlyArray<Race>,
  userId: string | ObjectID
) => Query<InsertWriteOpResult>;
export type SaveRaces = (
  races: ReadonlyArray<Race>,
  userId: string | ObjectID
) => Promise<InsertWriteOpResult>;

export const saveRacesFactory: SaveRacesFactory = (
  getConfigFunc,
  races,
  userId
) => db => {
  const collection = db.collection(getConfigFunc().collections.races);
  const racesWithUserId = races.map(race => ({
    ...race,
    userId: userId.toString()
  }));
  return collection.insertMany(racesWithUserId);
};

export const saveRaces: SaveRaces = (races, userId) =>
  runQueryContainer(saveRacesFactory(getConfig, races, userId));
