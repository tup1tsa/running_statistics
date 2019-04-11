import Moment from "moment";
import { humanizeDurationFactory } from "../../../application/logic/time/humanizeDuration";

it("tests with real moment", () => {
  expect(humanizeDurationFactory(Moment)(4)).toBe("a few seconds");
  expect(humanizeDurationFactory(Moment)(60)).toBe("a minute");
});
