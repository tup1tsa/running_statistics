import { Axios, Race, Response } from '../common_files/interfaces';

// todo: implement request cancel after timeout from axios documentation

export interface SendRaces {
  (races: Race[], axios: Axios): Promise<boolean>;
}

export const sendRaces: SendRaces = async (races, axios) => {
  if (races.length === 0) {
    return false;
  }
  let response: Response;
  try {
    response = await axios.post('/saveRaces', races);
  } catch (e) {
    response = e.response;
  }
  return response.status === 200 && response.data && response.data.saved === true;
};
