import { PositionInTime } from './Path/PathWatcher';

export const saveRun = async (
  run: PositionInTime[],
  savePathToStorage: (run: PositionInTime[]) => void,
  sendPathsToServerFactory: () => Promise<void>
) => {
  savePathToStorage(run);
  return sendPathsToServerFactory();
};