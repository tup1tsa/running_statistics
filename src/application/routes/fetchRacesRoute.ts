import { RequestHandler } from "express";
import { MESSAGES, Race } from "running_app_core";
import { FetchRaces, fetchRaces } from "../database/queries/fetchRaces";

type FetchRacesRouteFactory = (fetchRaces: FetchRaces) => RequestHandler;

export const fetchRacesRouteFactory: FetchRacesRouteFactory = fetchRacesFunc => async (
  req,
  res
) => {
  let races: ReadonlyArray<Race>;
  try {
    races = await fetchRacesFunc(res.locals.userId);
  } catch (e) {
    res.status(500).end(MESSAGES[0]);
    return;
  }
  res.status(200).end(races);
};

export const fetchRacesRoute: RequestHandler = (req, res, next) =>
  fetchRacesRouteFactory(fetchRaces)(req, res, next);
