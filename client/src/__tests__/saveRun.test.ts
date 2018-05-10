import { saveRun } from '../saveRun';
import { PositionInTime } from '../Path/PathWatcher';

it('should save run correctly', async (done) => {
  const run: PositionInTime[] = [{
    latitude: 17,
    longitude: 22,
    time: 2323
  }];
  const savePath = jest.fn();
  const sendPathsToServer = jest.fn();
  await saveRun(run, savePath, sendPathsToServer);
  expect(savePath.mock.calls.length).toBe(1);
  expect(savePath.mock.calls[0][0]).toBe(run);
  expect(sendPathsToServer.mock.calls.length).toBe(1);
  done();
});