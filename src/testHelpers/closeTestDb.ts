import { Connection } from "../server/database/databaseWrappers";

type CloseTestDb = (connection: Connection) => Promise<void>;

export const closeTestDb: CloseTestDb = async connection => {
  await connection.db.dropDatabase();
  await connection.clientInstance.close();
};
