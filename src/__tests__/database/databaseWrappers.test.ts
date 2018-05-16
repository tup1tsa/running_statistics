import { connect, disconnect, runQuery, Db } from '../../database/databaseWrappers';

describe('database logic', () => {

  const db = {};

  const defaultClient = {
    connect: jest.fn(),
    close: jest.fn(),
    db: jest.fn().mockReturnValue(db)
  };

  const defaultProcessEnv = {
    MONGODB_URI: 'prod db uri',
    MONGODB_URI_LOCAL: 'local db uri',
    MONGODB_NAME: 'prod db name',
    MONGODB_NAME_LOCAL: 'local db name',
    NODE_ENV: 'production'
  };

  it('should connect to correct uri and db', async (done) => {

    let processEnv = {...defaultProcessEnv};
    const client = {...defaultClient, connect: jest.fn()};

    client.connect.mockReturnValue(client);

    await expect(connect(processEnv, client)).resolves.toEqual({client, db});
    expect(client.connect.mock.calls[0][0]).toBe(processEnv.MONGODB_URI);
    expect(client.db.mock.calls[0][0]).toBe(processEnv.MONGODB_NAME);

    delete processEnv.NODE_ENV;
    await expect(connect(processEnv, client)).resolves.toEqual({client, db});
    expect(client.connect.mock.calls[1][0]).toBe(processEnv.MONGODB_URI_LOCAL);
    expect(client.db.mock.calls[1][0]).toBe(processEnv.MONGODB_NAME_LOCAL);
    done();
  });

  it('should disconnect', async (done) => {
    const client = {...defaultClient, close: jest.fn()};
    await disconnect(client);
    expect(client.close.mock.calls.length).toBe(1);
    done();
  });

  it('should catch connection, close and query errors', async (done) => {
    const error = {
      connection: 'connection error',
      close: 'close error',
      query: 'query error'
    };
    const connectionErrorClient = {
      ...defaultClient,
      connect: () => Promise.reject(error.connection)
    };
    await expect(runQuery(defaultProcessEnv, connectionErrorClient, jest.fn())).rejects.toBe(error.connection);

    const queryErrorClient = {...defaultClient};
    queryErrorClient.connect.mockResolvedValue(queryErrorClient);
    const badQuery = () => Promise.reject(error.query);
    await expect(runQuery(defaultProcessEnv, queryErrorClient, badQuery)).rejects.toBe(error.query);

    const closeErrorClient = {
      ...defaultClient,
      connect: jest.fn(),
      close: () => Promise.reject(error.close)
    };
    closeErrorClient.connect.mockResolvedValue(closeErrorClient);
    await expect(runQuery(defaultProcessEnv, closeErrorClient, jest.fn())).rejects.toBe(error.close);
    done();
  });

  it('run query should return query result', async (done) => {
    const result = {insertedCount: 1};
    const client = {...defaultClient};
    client.connect.mockResolvedValue(client);
    const query = (database: Db) => Promise.resolve(result);
    await (expect(runQuery(defaultProcessEnv, defaultClient, query))).resolves.toBe(result);
    done();
  });

});