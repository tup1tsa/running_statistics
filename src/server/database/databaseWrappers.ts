import { Db, MongoClient } from "mongodb";
// MongoClient is used directly here because of problems with static 'connect' method
// if you pass client: MongoClient as dependency in functions -> typescript would think
// that client is an instance of MongoClient, not MongoClient class itself

export type Query<T> = (db: Db) => Promise<T>;

export interface Connection {
  readonly clientInstance: MongoClient;
  readonly db: Db;
}

type Connect = (uri: string, dbName: string) => Promise<Connection>;

export const connect: Connect = async (uri, dbName) => {
  const clientInstance = await MongoClient.connect(
    uri,
    { useNewUrlParser: true }
  );
  return {
    clientInstance,
    db: clientInstance.db(dbName)
  };
};

export const disconnect = async (client: MongoClient) => {
  await client.close();
};

export const runQuery = async <T>(
  uri: string,
  dbName: string,
  query: Query<T>
) => {
  const { clientInstance, db } = await connect(
    uri,
    dbName
  );
  const result = await query(db);
  await clientInstance.close();
  return result;
};
