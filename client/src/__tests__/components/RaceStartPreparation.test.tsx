import { shallow } from "enzyme";
import * as React from "react";
import { RaceStartPreparation } from "../../application/components/RaceStartPreparation";

const defaultProps = {
  startTrackingRace: jest.fn()
};

it("should render four buttons", () => {
  const wrapper = shallow(<RaceStartPreparation {...defaultProps} />);
  expect(wrapper.find("button").length).toBe(4);
});

it("buttons should start proper races", () => {
  const tracking = jest.fn();
  const wrapper = shallow(
    <RaceStartPreparation {...defaultProps} startTrackingRace={tracking} />
  );
  wrapper.find("button.blue#start_running").simulate("click");
  expect(tracking.mock.calls[0][0]).toBe("running");

  wrapper.find("button.blue#start_walking").simulate("click");
  expect(tracking.mock.calls[1][0]).toBe("walking");

  wrapper.find("button.blue#start_cycling").simulate("click");
  expect(tracking.mock.calls[2][0]).toBe("cycling");

  wrapper.find("button.blue#start_driving").simulate("click");
  expect(tracking.mock.calls[3][0]).toBe("driving");
});
