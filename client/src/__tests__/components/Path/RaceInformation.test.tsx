import { shallow } from "enzyme";
import * as React from "react";
import { RaceInformation } from "../../../application/components/Path/RaceInformation";

describe("should render path information correctly", () => {
  const humanizeDuration = jest.fn().mockReturnValue("7 mins");

  const wrapper = shallow(
    <RaceInformation
      totalTimeSecs={117}
      avgSpeed={13.2563}
      totalDistance={23}
      humanizeDuration={humanizeDuration}
    />
  );

  it("should render correct data", () => {
    expect(wrapper.contains(<li>Average speed is 13.26 kmh</li>)).toBe(true);
    expect(wrapper.contains(<li>Total distance is 23 metres</li>)).toBe(true);
    expect(wrapper.contains(<li>Total time is 7 mins</li>)).toBe(true);
  });
});
