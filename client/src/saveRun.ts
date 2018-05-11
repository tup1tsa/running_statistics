import { PositionInTime } from './common_files/interfaces';

export const saveRun = async (
  run: PositionInTime[],
  savePathToStorage: (run: PositionInTime[]) => void,
  sendPathsToServerFactory: () => Promise<void>
) => {
  savePathToStorage(run);
  return sendPathsToServerFactory();
};