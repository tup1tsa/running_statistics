import { appConfig, Config } from "../application/config";

interface Params {
  readonly collection?: {
    readonly key: string;
    readonly value: string;
  };
}

export type GetTestConfig = (params: Params) => Config;

export const getTestConfig: GetTestConfig = params => ({
  collections: params.collection
    ? {
        ...appConfig.collections,
        [params.collection.key]: params.collection.value
      }
    : { ...appConfig.collections }
});
