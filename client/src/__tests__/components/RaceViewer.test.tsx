import { shallow } from "enzyme";
import React from "react";
import RacesOnMap from "../../application/components/RacesOnMap";
import { RaceViewer } from "../../application/components/RaceViewer";

const defaultProps = {
  startDownloadingRaces: jest.fn(),
  downloadInProgress: false,
  downloadHasBeenCompleted: true,

  incrementRace: jest.fn(),
  decrementRace: jest.fn(),
  races: [],
  currentRaceIndex: 0,
  partialRaceStart: 0,
  partialRaceFinish: 0
};

it("should show notification if there are no races available", () => {
  const message = <p>No races are available</p>;
  const wrapper = shallow(<RaceViewer {...defaultProps} />);
  expect(wrapper.contains(message)).toBe(true);
});

it("should show notification that races are being downloaded at the moment", () => {
  const message = <p>Races are being downloaded at the moment</p>;
  const wrapper = shallow(
    <RaceViewer {...defaultProps} downloadInProgress={true} />
  );
  expect(wrapper.contains(message)).toBe(true);
});

it("should start download if races are not downloaded", () => {
  const download = jest.fn();
  shallow(
    <RaceViewer
      {...defaultProps}
      downloadInProgress={false}
      downloadHasBeenCompleted={false}
      startDownloadingRaces={download}
    />
  );
  expect(download.mock.calls.length).toBe(1);
});

it("should render inner element if races are present", () => {
  const wrapper = shallow(
    <RaceViewer
      {...defaultProps}
      downloadHasBeenCompleted={true}
      races={[{ type: "running", path: [] }]}
    />
  );
  expect(wrapper.find(RacesOnMap).length).toBe(1);
});
