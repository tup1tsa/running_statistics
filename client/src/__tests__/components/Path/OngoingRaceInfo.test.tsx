import { shallow } from "enzyme";
import * as React from "react";
import { OngoingRaceInfoFactory } from "../../../application/components/Path/OngoingRaceInfo";
import { RaceInformation } from "../../../application/components/Path/RaceInformation";

const defaultInfo = {
  currentSpeed: 17,
  averageSpeed: 34,
  distance: 117,
  timeSecs: 522
};

const defaultProps = {
  race: { type: "running", path: [] },
  lastTimeCheck: 12,

  getRaceInfo: jest.fn().mockReturnValue(defaultInfo),
  toLocaleTime: jest.fn(),
  humanizeDuration: jest.fn()
};

it("should render race information with correct props", () => {
  const wrapper = shallow(<OngoingRaceInfoFactory {...defaultProps} />);
  const raceInfo = (
    <RaceInformation
      totalDistance={117}
      totalTimeSecs={522}
      avgSpeed={34}
      humanizeDuration={defaultProps.humanizeDuration}
    />
  );
  expect(wrapper.contains(raceInfo)).toBe(true);
});

it("should render its own data correctly", () => {
  const toLocaleTimeMock = jest.fn().mockReturnValue("7 pm");
  const wrapper = shallow(
    <OngoingRaceInfoFactory {...defaultProps} toLocaleTime={toLocaleTimeMock} />
  );
  expect(toLocaleTimeMock.mock.calls.length).toBe(1);
  expect(toLocaleTimeMock.mock.calls[0][0]).toBe(defaultProps.lastTimeCheck);
  expect(wrapper.contains(<li>Last time check was at 7 pm</li>)).toBe(true);
  // race type should be in uppercase
  expect(wrapper.contains(<li>Running is in progress</li>)).toBe(true);
  expect(wrapper.contains(<li>Current speed: 34 km/h</li>)).toBe(true);
});
