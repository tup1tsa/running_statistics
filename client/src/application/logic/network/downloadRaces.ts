import Axios from "axios";
import {
  Axios as AxiosInterface,
  Race,
  Response
} from "../../common_files/interfaces";
import {
  validatePath,
  ValidatePath
} from "../../common_files/validators/validatePath";

export type DownloadRaces = () => Promise<ReadonlyArray<Race>>;
type DownloadRacesFactory = (
  axios: AxiosInterface,
  validatePath: ValidatePath
) => DownloadRaces;

export const downloadRacesFactory: DownloadRacesFactory = (
  axios,
  validatePathFunc
) => async () => {
  let response: Response;
  try {
    response = await axios.post("/fetchRaces");
  } catch (e) {
    response = e.response;
  }
  if (response.status !== 200) {
    throw new Error("server is not available");
  }
  if (!response.data || !Array.isArray(response.data)) {
    throw new Error("data is invalid");
  }
  return response.data.filter((race: Race) => validatePathFunc(race.path));
};

export const downloadRaces: DownloadRaces = downloadRacesFactory(
  Axios,
  validatePath
);
