// import { Collection } from 'mongodb';

interface InsertResult {
  insertedCount: number;
}

export interface Collection {
  insertMany: (data: object[]) => Promise<InsertResult>;
}

export interface Db {
  collection: (name: string) => Collection;
  // tslint:disable-next-line no-any
  dropDatabase(): Promise<any>;
}

export interface MongoClientInstance {
  db(name: string): Db;
  close(): Promise<void>;
}

interface MongoClient {
  connect(uri: string): Promise<MongoClientInstance>;
}

export interface Query {
  (db: Db): Promise<InsertResult>;
}

interface ProcessEnv {
  [key: string]: string | undefined;
}

export const connect =  async (processEnv: ProcessEnv, Client: MongoClient) => {
  const isProd = processEnv.NODE_ENV === 'production';
  const uri = isProd ? processEnv.MONGODB_URI : processEnv.MONGODB_URI_LOCAL;
  const dbName = isProd ? processEnv.MONGODB_NAME : processEnv.MONGODB_NAME_LOCAL;
  if (typeof uri !== 'string' || typeof dbName !== 'string') {
    throw new Error('db uri or db name is not set in .env');
  }
  const client =  await Client.connect(uri);
  return {
    client,
    db: client.db(dbName)
  };
};

export const disconnect = async (client: MongoClientInstance) => {
  return await client.close();
};

export const runQuery = async (processEnv: ProcessEnv, Client: MongoClient, query: Query) => {
  const {client, db} = await connect(processEnv, Client);
  const result = await query(db);
  await client.close();
  return result;
};