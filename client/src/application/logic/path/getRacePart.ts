import { Race } from "running_app_core";

export type GetRacePart = (
  race: Race,
  startPercent: number,
  finishPercent: number
) => Race;

export const getRacePart: GetRacePart = (race, startPercent, finishPercent) => {
  if (
    startPercent > 100 ||
    startPercent < 0 ||
    finishPercent > 100 ||
    finishPercent < 0 ||
    startPercent > finishPercent
  ) {
    throw new Error("percentage is not correct");
  }
  const startPoint = Math.floor((race.path.length * startPercent) / 100);
  const finishPoint = Math.round((race.path.length * finishPercent) / 100);
  let path = race.path.slice(startPoint, finishPoint);
  if (path.length === 0) {
    path = [race.path[startPoint]];
  }
  return {
    type: race.type,
    path
  };
};
