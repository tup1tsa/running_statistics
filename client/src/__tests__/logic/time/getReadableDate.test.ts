import Moment from "moment";
import { getReadableDateFactory } from "../../../application/logic/time/getReadableDate";

it("tests with real moment", () => {
  const msInDay = 24 * 60 * 60 * 1000;
  expect(getReadableDateFactory(Moment)(0)).toBe("01.01.70");
  expect(getReadableDateFactory(Moment)(4 * msInDay)).toBe("05.01.70");
});
