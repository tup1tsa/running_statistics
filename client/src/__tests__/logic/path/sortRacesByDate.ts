import { getTestRaces } from "running_app_core";
import { sortRacesByDate } from "../../../application/logic/path/sortRacesByDate";

it("should  sort races properly", () => {
  const sortedRaces = getTestRaces();
  const unsortedRaces = [sortedRaces[1], sortedRaces[2], sortedRaces[0]];
  expect(sortRacesByDate(unsortedRaces)).toEqual(sortedRaces);
});
