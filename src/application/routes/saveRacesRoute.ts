import { Request, Response } from "express";
import { MESSAGES } from "../../../client/src/application/common_files/config";
import {
  ValidateRaces,
  validateRaces
} from "../../../client/src/application/common_files/validators/validateRaces";
import { SaveRaces, saveRaces } from "../database/queries/saveRaces";

type SaveRacesRoute = (req: Request, res: Response) => Promise<void>;
type SaveRacesRouteFactory = (
  saveRaces: SaveRaces,
  validateRaces: ValidateRaces
) => SaveRacesRoute;

export const saveRacesRouteFactory: SaveRacesRouteFactory = (
  saveRacesFunc,
  validateRacesFunc
) => async (req, res) => {
  const areRacesValid = validateRacesFunc(req.body);
  if (!areRacesValid) {
    res.status(403).end(MESSAGES[8]);
    return;
  }
  try {
    await saveRacesFunc(req.body, res.locals.userId);
  } catch (e) {
    res.status(500).end(MESSAGES[0]);
    return;
  }
  res.status(200).end(MESSAGES[1]);
  return;
};

export const saveRacesRoute: SaveRacesRoute = (req, res) =>
  saveRacesRouteFactory(saveRaces, validateRaces)(req, res);
