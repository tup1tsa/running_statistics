import * as React from 'react';
import { shallow } from 'enzyme';
import { RacesOnMap } from '../RacesOnMap';
import { DividedPathPart } from '../Path/pathUtils';
import { PositionInTime, Position } from '../common_files/interfaces';

describe('races on map display', () => {

  const defaultActivePath: PositionInTime[] = [
    { latitude: 44, longitude: 44, time: 117 },
    { latitude: 44.002, longitude: 44.002, time: 222 }
  ];
  const defaultInactivePath: PositionInTime[] = [
    { latitude: 44.002, longitude: 44.002, time: 222 },
    { latitude: 44.005, longitude: 44.002, time: 444 }
  ];
  const firstRace: DividedPathPart[] = [
    { active: true, path: defaultActivePath },
    { active: false, path: defaultInactivePath }
  ];
  let secondRace = [...firstRace];
  secondRace.push({ active: true, path: defaultActivePath });
  let thirdRace = [...secondRace];
  thirdRace.push({ active: false, path: defaultInactivePath });
  const defaultCenter: Position = { latitude: 54, longitude: 17 };
  const defaultProps = {
    activeColor: 'black',
    inactiveColor: 'red',
    races: [firstRace, secondRace, thirdRace],
    findCenter: jest.fn().mockReturnValue(defaultCenter),
    unitePath: jest.fn(),
    size: {
      width: 1000,
      height: 1000
    }
  };

  it('should not render next and previous races buttons if it`s the only race', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} races={[firstRace]} />);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should calculate center of the map correctly', () => {
    const center: Position = { latitude: 44, longitude: 22 };
    const unitedPath: PositionInTime[] = [{ latitude: 12, longitude: 44, time: 222 }];
    const findCenter = jest.fn().mockReturnValue(center);
    const unitePath = jest.fn().mockReturnValue(unitedPath);
    const wrapper = shallow(<RacesOnMap {...defaultProps} findCenter={findCenter} unitePath={unitePath} />);
    expect(findCenter.mock.calls.length).toBe(1);
    expect(findCenter.mock.calls[0][0]).toEqual(unitedPath);
    expect(wrapper.props().children[0].props.center).toEqual(center);
  });

  it('should path correct props to google map wrapper', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    const coloredPath = [
      { color: defaultProps.activeColor, positions: defaultActivePath },
      { color: defaultProps.inactiveColor, positions: defaultInactivePath }
    ];
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

  it('should render first race if multiple races were send', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    expect(wrapper.props().children[0].props.path.length).toBe(firstRace.length);
  });

  it('should render correct races after pressing buttons', () => {
    const wrapper = shallow(<RacesOnMap {...defaultProps} />);
    const getRaceLength = () => wrapper.props().children[0].props.path.length;
    const nextButton = wrapper.find('button#next_race');
    const previousButton = wrapper.find('button#previous_race');
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(secondRace.length);
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(thirdRace.length);
    nextButton.simulate('click');
    expect(getRaceLength()).toBe(firstRace.length);
    previousButton.simulate('click');
    expect(getRaceLength()).toBe(thirdRace.length);
    previousButton.simulate('click');
    expect(getRaceLength()).toBe(secondRace.length);
  });

});