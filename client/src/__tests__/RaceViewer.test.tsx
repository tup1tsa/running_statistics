import { shallow } from "enzyme";
import * as React from "react";
import { RaceViewer } from "../application/RaceViewer";
import { RacesOnMapFactory } from "../factories/RacesOnMapFactory";

describe("race viewer block", () => {
  const defaultProps = {
    downloadRaces: jest.fn()
  };

  it("should show notification if there are no races available", () => {
    const message = <p>No races are available</p>;
    const wrapper = shallow(<RaceViewer {...defaultProps} />, {
      disableLifecycleMethods: true
    });
    expect(wrapper.contains(message)).toBe(true);
  });

  it("should show notification that races are being downloaded at the moment", done => {
    const message = <p>Races are being downloaded at the moment</p>;
    const downloadRaces = jest.fn().mockResolvedValue([]);
    const wrapper = shallow(
      <RaceViewer {...defaultProps} downloadRaces={downloadRaces} />
    );
    expect(wrapper.contains(message)).toBe(true);
    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.contains(message)).toBe(false);
      done();
    });
  });

  it("should show error notification if races download was unsuccessful", async done => {
    const errorMessage = "some problems fetching errors";
    const downloadRaces = jest.fn().mockRejectedValue(new Error(errorMessage));
    const wrapper = shallow(
      <RaceViewer {...defaultProps} downloadRaces={downloadRaces} />
    );
    process.nextTick(() => {
      // async lifecycle method workaround
      wrapper.update();
      expect(wrapper.contains(<p>{errorMessage}</p>)).toBe(true);
      done();
    });
  });

  it("should pass correct props to Races on map component", async done => {
    const races = [{ type: "walking", path: [] }];
    const downloadRaces = jest.fn().mockResolvedValue(races);
    const wrapper = shallow(
      <RaceViewer {...defaultProps} downloadRaces={downloadRaces} />
    );
    process.nextTick(() => {
      wrapper.update();
      const racesOnMapElem = (
        <RacesOnMapFactory races={races} size={{ width: 1000, height: 1000 }} />
      );
      expect(wrapper.contains(racesOnMapElem)).toBe(true);
      done();
    });
  });
});
