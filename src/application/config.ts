export interface Config {
  collections: {
    races: string;
    users: string;
  };
}

export const appConfig: Config = {
  collections: {
    races: "races",
    users: "users"
  }
};
