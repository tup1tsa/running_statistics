import { Race } from './common_files/interfaces';

export const saveRace = async (
  run: Race,
  saveRaceToStorage: (run: Race) => void,
  sendPathsToServerFactory: () => Promise<string>
) => {
  saveRaceToStorage(run);
  return sendPathsToServerFactory();
};