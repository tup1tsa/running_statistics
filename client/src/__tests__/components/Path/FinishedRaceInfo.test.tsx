import { shallow } from "enzyme";
import * as React from "react";
import { FinishedRaceInfoFactory } from "../../../application/components/Path/FinishedRaceInfo";
import { RaceInformation } from "../../../application/components/Path/RaceInformation";

const defaultProps = {
  getRaceInfo: jest.fn().mockReturnValue({
    distance: 23,
    timeSecs: 322,
    averageSpeed: 412.32
  }),
  lastTimeCheck: 12,
  race: { type: "walking", path: [] },
  toLocaleDate: jest.fn(),
  humanizeDuration: jest.fn()
};

it("should render race information with correct props", () => {
  const raceInfoMock = jest.fn().mockReturnValue({
    distance: 223,
    timeSecs: 12,
    averageSpeed: 12.32
  });
  const wrapper = shallow(
    <FinishedRaceInfoFactory {...defaultProps} getRaceInfo={raceInfoMock} />
  );
  const raceInfo = (
    <RaceInformation
      humanizeDuration={defaultProps.humanizeDuration}
      totalDistance={223}
      totalTimeSecs={12}
      avgSpeed={12.32}
    />
  );
  expect(wrapper.contains(raceInfo)).toBe(true);
});
it("should render its own data correctly", () => {
  const toLocaleDate = jest.fn().mockReturnValue("24/12/18 3 pm");
  const wrapper = shallow(
    <FinishedRaceInfoFactory {...defaultProps} toLocaleDate={toLocaleDate} />
  );
  expect(wrapper.contains(<li>Race type: walking</li>)).toBe(true);
  expect(toLocaleDate.mock.calls.length).toBe(1);
  expect(toLocaleDate.mock.calls[0][0]).toBe(defaultProps.lastTimeCheck);
  expect(wrapper.contains(<li>Date: 24/12/18 3 pm</li>)).toBe(true);
});
