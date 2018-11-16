export interface Config {
  collections: {
    races: string;
    users: string;
  };
}

export type GetConfig = () => Config;

export const getConfig: GetConfig = () => ({
  collections: {
    races: "races",
    users: "users"
  }
});
