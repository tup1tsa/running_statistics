import Axios from "axios";
import {
  Axios as AxiosInterface,
  Race,
  Response
} from "../../common_files/interfaces";

// todo: implement request cancel after timeout from axios documentation

export type SendRaces = (races: ReadonlyArray<Race>) => Promise<boolean>;
type SendRacesFactory = (axios: AxiosInterface) => SendRaces;

export const sendRacesFactory: SendRacesFactory = axios => async races => {
  if (races.length === 0) {
    return false;
  }
  let response: Response;
  try {
    response = await axios.post("/saveRaces", races);
  } catch (e) {
    response = e.response;
  }
  // todo: change boolean
  // this function should reject on fail
  return (
    response.status === 200 && response.data && response.data.saved === true
  );
};

export const sendRaces: SendRaces = sendRacesFactory(Axios);
