import { RequestHandler } from "express";
import { MESSAGES, Race, ValidateRaces, validateRaces } from "running_app_core";

type SaveRaces = (
  races: ReadonlyArray<Race>,
  userId: string
) => Promise<boolean>;

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
    res.status(403).end("races are corrupted");
    return;
  }
  try {
    // todo: id should be passes as auth header
    await saveRacesFunc(races, res.locals.user._id);
  } catch (e) {
    res.status(500).end("there were some problems saving the races");
    return;
  }
  res.status(200).end(MESSAGES.raceSavedSuccess);
  return;
};

const tempSaveRacesMock: SaveRaces = async (races, userId) => true

const saveRacesRoute: RequestHandler = (req, res, next) =>
  saveRacesRouteFactory(tempSaveRacesMock, validateRaces)(req, res, next);

export default saveRacesRoute;
