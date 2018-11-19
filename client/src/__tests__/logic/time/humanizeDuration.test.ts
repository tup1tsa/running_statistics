import * as moment from "moment";
import { humanizeDurationFactory } from "../../../application/logic/time/humanizeDuration";

it("tests with real moment", () => {
  expect(humanizeDurationFactory(moment)(4)).toBe("a few seconds");
  expect(humanizeDurationFactory(moment)(60)).toBe("a minute");
});
