import * as React from 'react';
import { shallow } from 'enzyme';
import { RacesOnMap } from '../RacesOnMap';
import { PositionInTime, Position, Race } from '../common_files/interfaces';
import { FinishedRaceInfoFactory } from '../Path/FinishedRaceInfoFactory';

describe('races on map display', () => {

  const firstRacePath: PositionInTime[] = [
    { latitude: 44, longitude: 44, time: 117 },
    { latitude: 44.002, longitude: 44.002, time: 222 }
  ];
  const secondRacePath: PositionInTime[] = [
    { latitude: 44.002, longitude: 44.002, time: 222 },
    { latitude: 44.005, longitude: 44.002, time: 444 }
  ];
  const thirdRacePath: PositionInTime[] = [
    { latitude: 44.005, longitude: 44.002, time: 444 },
    { latitude: 44.007, longitude: 44.007, time: 666 }
  ];
  const firstRace: Race = {
    type: 'running',
    path: [...firstRacePath]
  };
  const secondRace = {
    type: 'walking',
    path: [...firstRace.path, ...secondRacePath]
  };
  const thirdRace = {
    type: 'cycling',
    path: [...secondRace.path, ...thirdRacePath]
  };
  const defaultCenter: Position = { latitude: 54, longitude: 17 };
  const raceInfo = {
    distance: 12,
    timeSecs: 133,
    averageSpeed: 62
  };
  const defaultProps = {
    activeColor: 'black',
    inactiveColor: 'red',
    races: [firstRace, secondRace, thirdRace],
    findCenter: jest.fn().mockReturnValue(defaultCenter),
    divideRace: (race: Race) => [{ active: true, path: race.path }],
    getRaceInfo: jest.fn().mockReturnValue(raceInfo),
    size: {
      width: 1000,
      height: 1000
    }
  };

  it('should not render next and previous races buttons if it`s the only race', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} races={[firstRace]} />);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should display information about races correctly', () => {
    const info = (
      <FinishedRaceInfoFactory
        totalDistance={raceInfo.distance}
        totalTimeSecs={raceInfo.timeSecs}
        avgSpeed={raceInfo.averageSpeed}
        lastTimeCheck={thirdRace.path[thirdRace.path.length - 1].time}
        raceType={thirdRace.type}
      />
    );
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    expect(wrapper.contains(info)).toBe(true);
  });

  it('should calculate center of the map correctly', () => {
    const center: Position = { latitude: 44, longitude: 22 };
    const findCenter = jest.fn().mockReturnValue(center);
    const wrapper = shallow(<RacesOnMap {...defaultProps} findCenter={findCenter} />);
    expect(findCenter.mock.calls.length).toBe(1);
    expect(findCenter.mock.calls[0][0]).toEqual(thirdRace.path);
    expect(wrapper.props().children[0].props.center).toEqual(center);
  });

  it('should recalculate center if race was changed', () => {
    const firstCenter = { latitude: 17, longitude: 32 };
    const secondCenter = { latitude: 22, longitude: 55 };
    const findCenter = jest.fn()
      .mockReturnValueOnce(firstCenter)
      .mockReturnValueOnce(secondCenter);
    const wrapper = shallow(<RacesOnMap {...defaultProps} findCenter={findCenter} />);
    wrapper.find('button#next_race').simulate('click');
    expect(findCenter.mock.calls.length).toBe(2);
    expect(wrapper.props().children[0].props.center).toEqual(secondCenter);
  });

  it('should path correct props to google map wrapper', () => {
    const coloredPath = [
      { color: defaultProps.activeColor, positions: firstRacePath },
      { color: defaultProps.inactiveColor, positions: secondRacePath }
    ];
    const divideRaceMock = jest.fn().mockReturnValue([
      { active: true, path: firstRacePath },
      { active: false, path: secondRacePath }
    ]);
    const wrapper = shallow(<RacesOnMap {...defaultProps} divideRace={divideRaceMock} />);
    // todo: zoom is magic number here... And it equals 12 for now. Pass it as a prop?
    expect(wrapper.props().children[0].props).toEqual({
      width: defaultProps.size.width,
      height: defaultProps.size.height,
      center: defaultCenter,
      zoom: 12,
      path: coloredPath
    });
  });

  it('should render next and previous buttons if  races number > 1 ', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    expect(wrapper.find('button').length).toBe(2);
  });

  it('should sort races by date and render latest race if multiple races were send', () => {
    const racesInBadOrder = [secondRace, firstRace, thirdRace];
    const wrapper = shallow(<RacesOnMap {...defaultProps} races={racesInBadOrder} />);
    const instance = wrapper.instance() as RacesOnMap;
    expect(wrapper.props().children[0].props.path[0].positions).toEqual(thirdRace.path);
    expect(instance.state.currentRaceIndex).toBe(2);
  });

  it('should render correct races after pressing buttons', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    const getRaceLength = () => wrapper.props().children[0].props.path[0].positions.length;
    const nextButton = wrapper.find('button#next_race');
    const previousButton = wrapper.find('button#previous_race');
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(firstRace.path.length);
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(secondRace.path.length);
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(thirdRace.path.length);
    previousButton.simulate('click');
    expect(getRaceLength()).toBe(secondRace.path.length);
  });

});