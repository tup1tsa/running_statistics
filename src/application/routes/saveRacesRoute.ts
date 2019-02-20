import { RequestHandler } from "express";
import { MESSAGES } from "running_app_core";
import {
  ValidateRaces,
  validateRaces
} from "running_app_core";
import { SaveRaces, saveRaces } from "../database/queries/saveRaces";

type SaveRacesRouteFactory = (
  saveRaces: SaveRaces,
  validateRaces: ValidateRaces
) => RequestHandler;

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

export const saveRacesRoute: RequestHandler = (req, res, next) =>
  saveRacesRouteFactory(saveRaces, validateRaces)(req, res, next);
