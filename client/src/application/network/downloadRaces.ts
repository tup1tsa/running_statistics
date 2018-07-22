import { Axios, Race, Response } from '../common_files/interfaces';
import { ValidatePath } from '../storage/fetchRaces';

export const downloadRaces = async (axios: Axios, validatePath: ValidatePath): Promise<Race[]> => {
  let response: Response;
  try {
    response = await axios.post('/fetchRaces');
  } catch (e) {
    response = e.response;
  }
  if (response.status !== 200) {
    throw new Error('server is not available');
  }
  if (!response.data || !Array.isArray(response.data)) {
    throw new Error('data is invalid');
  }
  return response.data
    .filter((race: Race) => validatePath(race.path));
};