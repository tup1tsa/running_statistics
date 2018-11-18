import { Query, runQueryContainer } from "mongo-wrappers";
import { InsertWriteOpResult } from "mongodb";
import { Race } from "../../../../client/src/application/common_files/interfaces";
import { GetConfig, getConfig } from "../../config";

type SaveRacesFactory = (
  getConfig: GetConfig,
  races: ReadonlyArray<Race>
) => Query<InsertWriteOpResult>;
type SaveRaces = (races: ReadonlyArray<Race>) => Promise<InsertWriteOpResult>;

export const saveRacesFactory: SaveRacesFactory = (
  getConfigFunc,
  races
) => db => {
  const collection = db.collection(getConfigFunc().collections.races);
  // @ts-ignore
  // todo: fix
  return collection.insertMany(races);
};

export const saveRaces: SaveRaces = races =>
  runQueryContainer(saveRacesFactory(getConfig, races));
