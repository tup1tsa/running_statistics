import { Coordinates } from "running_app_core";
import { getDistance } from "../../../application/logic/geoLibHelpers";
import { isMiddlePointAccurateFactory } from "../../../application/logic/path/isMiddlePointAccurate";

it("should return true if third point further away from 1-st than second", () => {
  const start: Coordinates = { longitude: 0, latitude: 44 };
  const middle: Coordinates = { longitude: 0, latitude: 45 };
  const end: Coordinates = { longitude: 0, latitude: 60 };
  expect(isMiddlePointAccurateFactory(getDistance)(start, middle, end)).toBe(
    true
  );
});

it("should return false if third point near the first point. Second point is very far away", () => {
  const start: Coordinates = { longitude: 0, latitude: 24 };
  const middle: Coordinates = { longitude: 24, latitude: 24 };
  const end: Coordinates = { longitude: 3, latitude: 24 };
  expect(isMiddlePointAccurateFactory(getDistance)(start, middle, end)).toBe(
    false
  );
});
