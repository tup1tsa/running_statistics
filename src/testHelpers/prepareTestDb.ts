import * as dotenv from "dotenv";
import { connect, Connection } from "../server/database/databaseWrappers";
import { getConnectionInfo } from "../server/database/getConnectionInfo";

dotenv.load();

type PrepareTestDb = (dbName: string) => Promise<Connection>;

export const prepareTestDb: PrepareTestDb = async dbName => {
  const connectionInfo = getConnectionInfo(process.env);
  return await connect(
    connectionInfo.uri,
    dbName
  );
};
