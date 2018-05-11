import { MongoClient, Db } from 'mongodb';
import { PositionInTime } from '../client/src/Path/PathWatcher';

export const connect =  async (): Promise<MongoClient> => {
  const url = process.env.MONGODB_URI;
  if (typeof url !== 'string') {
    throw new Error('process env is broken');
  }
  return await MongoClient.connect(url);
};

export const disconnect = async (client: MongoClient) => {
  return await client.close();
};

export const saveRuns = async (db: Db, runs: PositionInTime[][]) => {
  const collection = db.collection('runs');
  const runsWithType = runs.map(run => (
    {
      type: 'run',
      points: run
    }
  ));
  return collection.insertMany(runsWithType);
};