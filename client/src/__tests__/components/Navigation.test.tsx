import { shallow } from "enzyme";
import * as React from "react";
import { Navigation } from "../../application/components/Navigation";

it("every button should render appropriate block", () => {
  const props = {
    startRaceBlock: jest.fn(),
    detailedRaceStats: jest.fn(),
    overallRaceStats: jest.fn()
  };
  const wrapper = shallow(<Navigation {...props} />);
  wrapper.find("#show_detailed_stats").simulate("click");
  expect(props.detailedRaceStats.mock.calls.length).toBe(1);

  wrapper.find("#start_race").simulate("click");
  expect(props.startRaceBlock.mock.calls.length).toBe(1);

  wrapper.find("#show_overall_stats").simulate("click");
  expect(props.overallRaceStats.mock.calls.length).toBe(1);
});
