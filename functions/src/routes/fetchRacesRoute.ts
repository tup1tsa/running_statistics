import { RequestHandler } from "express";
import { MESSAGES, Race } from "running_app_core";

type FetchRaces = (userId: string) => Promise<ReadonlyArray<Race>>

type FetchRacesRouteFactory = (fetchRaces: FetchRaces) => RequestHandler;

export const fetchRacesRouteFactory: FetchRacesRouteFactory = fetchRacesFunc => async (
  req,
  res
) => {
  let races: ReadonlyArray<Race>;
  try {
    // todo: id should be passed as auth header
    races = await fetchRacesFunc(res.locals.user._id);
  } catch (e) {
    res.status(500).end(MESSAGES.unexpectectedError);
    return;
  }
  res.status(200).send({ races });
};

const tempFetchRacesMock: FetchRaces = async (id) => ([])

const fetchRacesRoute: RequestHandler = (req, res, next) =>
  fetchRacesRouteFactory(tempFetchRacesMock)(req, res, next);

export default fetchRacesRoute;
