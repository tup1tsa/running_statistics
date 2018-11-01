import axios from "axios";
import { validatePath } from "../../../application/common_files/validatePath";
import { downloadRaces } from "../../../application/logic/network/downloadRaces";

export const downloadRacesContainer = () => downloadRaces(axios, validatePath);
