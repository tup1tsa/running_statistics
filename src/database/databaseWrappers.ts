import { MongoClient, Db } from 'mongodb';
// MongoClient is used directly here because of problems with static 'connect' method
// if you pass client: MongoClient as dependency in functions -> typescript would think
// that client is an instance of MongoClient, not MongoClient class itself
// Db interface is used for simplification (it would be very tedious to make interface
// of mongodb manually)

export interface Query<T> {
  (db: Db): Promise<T>;
}

export const connect =  async (uri: string, dbName: string) => {
  const clientInstance =  await MongoClient.connect(uri);
  return {
    clientInstance,
    db: clientInstance.db(dbName)
  };
};

export const disconnect = async (client: MongoClient) => {
  await client.close();
};

export const runQuery = async <T>(uri: string, dbName: string, query: Query<T>) => {
  const {clientInstance, db} = await connect(uri, dbName);
  const result = await query(db);
  await clientInstance.close();
  return result;
};