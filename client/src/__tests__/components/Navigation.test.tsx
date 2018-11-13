import { shallow } from "enzyme";
import * as React from "react";
import { RaceType } from "../../application/actions/actions";
import { Navigation } from "../../application/components/Navigation";

const defaultRaceType: RaceType = "walking";

const defaultProps = {
  startRaceBlock: jest.fn(),
  detailedRaceStats: jest.fn(),
  overallRaceStats: jest.fn(),
  currentRaceBlock: jest.fn(),
  raceInProgress: false,
  raceType: defaultRaceType
};

it("every button should render appropriate default block", () => {
  const showDetailedStats = jest.fn();
  const showStartRaceBlock = jest.fn();
  const showOverallStatsBlock = jest.fn();
  const wrapper = shallow(
    <Navigation
      {...defaultProps}
      startRaceBlock={showStartRaceBlock}
      detailedRaceStats={showDetailedStats}
      overallRaceStats={showOverallStatsBlock}
    />
  );
  expect(wrapper.find("button").length).toBe(3);
  wrapper.find("#show_detailed_stats").simulate("click");
  expect(showDetailedStats.mock.calls.length).toBe(1);

  wrapper.find("#start_race").simulate("click");
  expect(showStartRaceBlock.mock.calls.length).toBe(1);

  wrapper.find("#show_overall_stats").simulate("click");
  expect(showOverallStatsBlock.mock.calls.length).toBe(1);
});

it("should render show current race button if race is in progress", () => {
  const showCurrentRaceBlock = jest.fn();
  const props = {
    ...defaultProps,
    raceInProgress: true,
    currentRaceBlock: showCurrentRaceBlock
  };
  const wrapper = shallow(<Navigation {...props} />);
  wrapper.find("#show_current_race").simulate("click");
  expect(showCurrentRaceBlock.mock.calls.length).toBe(1);
  expect(showCurrentRaceBlock.mock.calls[0][0]).toBe(defaultRaceType);
});
