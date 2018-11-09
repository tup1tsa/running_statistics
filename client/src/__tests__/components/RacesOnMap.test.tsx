import { shallow } from "enzyme";
import * as React from "react";
import {
  Coordinates,
  PositionInTime,
  Race
} from "../../application/common_files/interfaces";
import { RacesOnMapFactory } from "../../application/components/RacesOnMap";
import { getRacePart } from "../../application/logic/path/getRacePart";
import { sortRacesByDate } from "../../application/logic/path/sortRacesByDate";

const firstRacePath: ReadonlyArray<PositionInTime> = [
  { latitude: 44, longitude: 44, time: 117 },
  { latitude: 44.002, longitude: 44.002, time: 222 }
];
const secondRacePath: ReadonlyArray<PositionInTime> = [
  { latitude: 44, longitude: 44, time: 333 },
  { latitude: 44.002, longitude: 44.002, time: 444 },
  { latitude: 44.002, longitude: 44.002, time: 555 },
  { latitude: 44.005, longitude: 44.002, time: 666 }
];
const thirdRacePath: ReadonlyArray<PositionInTime> = [
  { latitude: 44, longitude: 44, time: 777 },
  { latitude: 44.002, longitude: 44.002, time: 888 },
  { latitude: 44.002, longitude: 44.002, time: 999 },
  { latitude: 44.005, longitude: 44.002, time: 1100 },
  { latitude: 44.005, longitude: 44.002, time: 1200 },
  { latitude: 44.007, longitude: 44.007, time: 1300 }
];
const firstRace: Race = {
  type: "running",
  path: firstRacePath
};
const secondRace = {
  type: "walking",
  path: secondRacePath
};
const thirdRace = {
  type: "cycling",
  path: thirdRacePath
};
const defaultCenter: Coordinates = { latitude: 54, longitude: 17 };
const raceInfo = {
  distance: 12,
  timeSecs: 133,
  averageSpeed: 62
};
const defaultProps = {
  activeColor: "black",
  inactiveColor: "red",
  races: [firstRace, secondRace, thirdRace],
  findCenter: jest.fn().mockReturnValue(defaultCenter),
  divideRace: (race: Race) => [{ active: true, path: race.path }],
  getRaceInfo: jest.fn().mockReturnValue(raceInfo),
  getRacePart,
  size: {
    width: 1000,
    height: 1000
  },
  currentRaceIndex: 0,
  partialRaceStart: 0,
  partialRaceFinish: 100,
  incrementRace: jest.fn(),
  decrementRace: jest.fn(),
  sortRacesByDate
};

it("should not render next and previous races buttons if it`s the only race", () => {
  const wrapper = shallow(
    <RacesOnMapFactory {...defaultProps} races={[firstRace]} />
  );
  expect(wrapper.find("button").length).toBe(0);
});

it("should display information about races correctly", () => {
  const wrapper = shallow(<RacesOnMapFactory {...defaultProps} />);
  expect(wrapper.find("#info").length).toBe(1);
});

it("should calculate center of the map correctly", () => {
  const center: Coordinates = { latitude: 44, longitude: 22 };
  const findCenter = jest.fn().mockReturnValue(center);
  const wrapper = shallow(
    <RacesOnMapFactory
      {...defaultProps}
      findCenter={findCenter}
      currentRaceIndex={2}
    />
  );
  expect(findCenter.mock.calls.length).toBe(1);
  expect(findCenter.mock.calls[0][0]).toEqual(thirdRace.path);
  expect(wrapper.props().children[0].props.center).toEqual(center);
});

it("should path correct props to google map wrapper", () => {
  const getRacePartMock = jest.fn().mockReturnValue(firstRace);
  const coloredPath = [
    { color: defaultProps.activeColor, positions: firstRacePath },
    { color: defaultProps.inactiveColor, positions: secondRacePath }
  ];
  const divideRaceMock = jest
    .fn()
    .mockReturnValue([
      { active: true, path: firstRacePath },
      { active: false, path: secondRacePath }
    ]);
  const wrapper = shallow(
    <RacesOnMapFactory
      {...defaultProps}
      divideRace={divideRaceMock}
      currentRaceIndex={0}
      getRacePart={getRacePartMock}
    />
  );
  // todo: zoom is magic number here... And it equals 12 for now. Pass it as a prop?
  expect(wrapper.props().children[0].props).toEqual({
    width: defaultProps.size.width,
    height: defaultProps.size.height,
    center: defaultCenter,
    zoom: 12,
    path: coloredPath
  });
  expect(getRacePartMock.mock.calls.length).toBe(1);
  expect(getRacePartMock.mock.calls[0]).toEqual([firstRace, 0, 100]);
});

it("should sort races by date", () => {
  const racesInBadOrder = [secondRace, firstRace, thirdRace];
  const wrapper = shallow(
    <RacesOnMapFactory
      {...defaultProps}
      races={racesInBadOrder}
      currentRaceIndex={0}
    />
  );
  expect(wrapper.props().children[0].props.path[0].positions).toEqual(
    firstRace.path
  );
});

it("should call correct races after pressing buttons", () => {
  const incrementRace = jest.fn();
  const decrementRace = jest.fn();
  const wrapper = shallow(
    <RacesOnMapFactory
      {...defaultProps}
      incrementRace={incrementRace}
      decrementRace={decrementRace}
    />
  );
  const nextButton = wrapper.find("button#next_race");
  const previousButton = wrapper.find("button#previous_race");
  nextButton.simulate("click");
  expect(incrementRace.mock.calls.length).toBe(1);
  previousButton.simulate("click");
  expect(decrementRace.mock.calls.length).toBe(1);
});
