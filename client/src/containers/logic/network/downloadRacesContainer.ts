import axios from "axios";
import { Race } from "../../../application/common_files/interfaces";
import { validatePath } from "../../../application/common_files/validators/validatePath";
import { downloadRaces } from "../../../application/logic/network/downloadRaces";

export type DownloadRacesContainer = () => Promise<ReadonlyArray<Race>>;

export const downloadRacesContainer: DownloadRacesContainer = () =>
  downloadRaces(axios, validatePath);
