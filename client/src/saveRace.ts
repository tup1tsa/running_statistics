import { Race } from './common_files/interfaces';

export const saveRace = async (
  race: Race,
  saveRaceToStorage: (race: Race) => void,
  sendPathsToServerFactory: () => Promise<string>
) => {
  saveRaceToStorage(race);
  return sendPathsToServerFactory();
};