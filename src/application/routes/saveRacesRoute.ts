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
  const { races } = req.body;
  const areRacesValid = validateRacesFunc(races);
  if (!areRacesValid) {
    res.status(403).end(MESSAGES.racesAreNotValid);
    return;
  }
  try {
    await saveRacesFunc(races, res.locals.user._id);
  } catch (e) {
    res.status(500).end(MESSAGES.unexpectectedError);
    return;
  }
  res.status(200).end(MESSAGES.raceSavedSuccess);
  return;
};

const saveRacesRoute: RequestHandler = (req, res, next) =>
  saveRacesRouteFactory(saveRaces, validateRaces)(req, res, next);

export default saveRacesRoute;
