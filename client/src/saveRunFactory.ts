import { PositionInTime } from './Path/PathWatcher';
import { saveRun } from './saveRun';
import { savePathToStorageFactory } from './Path/storageUtilsFactories';
import { sendPathsToServerFactory } from './Path/sendPathsToServerFactory';

export const saveRunFactory = (run: PositionInTime[]) =>
  saveRun(run, savePathToStorageFactory, sendPathsToServerFactory);