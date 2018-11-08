import { shallow } from "enzyme";
import * as React from "react";
import { RaceStartPreparation } from "../../application/components/RaceStartPreparation";

describe("race start preparation logic", () => {
  const defaultProps = {
    delaySecs: 2,
    minimumDistanceDiff: 2,
    saveRace: jest.fn(),
    setSaveResult: jest.fn()
  };

  it("should render four buttons", () => {
    const wrapper = shallow(<RaceStartPreparation {...defaultProps} />);
    expect(wrapper.find("button").length).toBe(4);
  });

  it("should finish race with empty message if back button is clicked", () => {
    const setSaveResult = jest.fn();
    const wrapper = shallow(
      <RaceStartPreparation {...defaultProps} setSaveResult={setSaveResult} />
    );
    wrapper.find("button.back").simulate("click");
    expect(setSaveResult.mock.calls.length).toBe(1);
    expect(setSaveResult.mock.calls[0][0]).toBe("");
  });

  it("should not render buttons if one of the buttons was clicked", () => {
    const wrapper = shallow(<RaceStartPreparation {...defaultProps} />);
    wrapper.find("button#start_walking").simulate("click");
    expect(wrapper.find("button").length).toBe(0);
  });
});
