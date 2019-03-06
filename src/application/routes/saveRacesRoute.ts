import { RequestHandler } from "express";
import { MESSAGES, ValidateRaces, validateRaces } from "running_app_core";
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
    res.status(403).end(MESSAGES.racesAreNotValid);
    return;
  }
  try {
    await saveRacesFunc(req.body, res.locals.userId);
  } catch (e) {
    res.status(500).end(MESSAGES.unexpectectedError);
    return;
  }
  res.status(200).end(MESSAGES.raceSavedSuccess);
  return;
};

export const saveRacesRoute: RequestHandler = (req, res, next) =>
  saveRacesRouteFactory(saveRaces, validateRaces)(req, res, next);
