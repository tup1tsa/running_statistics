import * as React from 'react';
import { shallow } from 'enzyme';
import { RunsOnMap } from '../RunsOnMap';
import { DividedPathPart } from '../Path/pathUtils';
import { PositionInTime, Position } from '../common_files/interfaces';

describe('runs on map display', () => {

  const defaultActivePath: PositionInTime[] = [
    { latitude: 44, longitude: 44, time: 117 },
    { latitude: 44.002, longitude: 44.002, time: 222 }
  ];
  const defaultInactivePath: PositionInTime[] = [
    { latitude: 44.002, longitude: 44.002, time: 222 },
    { latitude: 44.005, longitude: 44.002, time: 444 }
  ];
  const firstRun: DividedPathPart[] = [
    { active: true, path: defaultActivePath },
    { active: false, path: defaultInactivePath }
  ];
  let secondRun = [...firstRun];
  secondRun.push({ active: true, path: defaultActivePath });
  let thirdRun = [...secondRun];
  thirdRun.push({ active: false, path: defaultInactivePath });
  const defaultCenter: Position = { latitude: 54, longitude: 17 };
  const defaultProps = {
    activeColor: 'black',
    inactiveColor: 'red',
    runs: [firstRun, secondRun, thirdRun],
    findCenter: jest.fn().mockReturnValue(defaultCenter),
    unitePath: jest.fn(),
    size: {
      width: 1000,
      height: 1000
    }
  };

  it('should not render next and previous runs buttons if it`s the only run', () => {
    const wrapper = shallow(<RunsOnMap {...defaultProps} runs={[firstRun]} />);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should calculate center of the map correctly', () => {
    const center: Position = { latitude: 44, longitude: 22 };
    const unitedPath: PositionInTime[] = [{ latitude: 12, longitude: 44, time: 222 }];
    const findCenter = jest.fn().mockReturnValue(center);
    const unitePath = jest.fn().mockReturnValue(unitedPath);
    const wrapper = shallow(<RunsOnMap {...defaultProps} findCenter={findCenter} unitePath={unitePath} />);
    expect(findCenter.mock.calls.length).toBe(1);
    expect(findCenter.mock.calls[0][0]).toEqual(unitedPath);
    expect(wrapper.props().children[0].props.center).toEqual(center);
  });

  it('should path correct props to google map wrapper', () => {
    const wrapper = shallow(<RunsOnMap {...defaultProps} />);
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

  it('should render next and previous buttons if  runs number > 1 ', () => {
    const wrapper = shallow(<RunsOnMap {...defaultProps} />);
    expect(wrapper.find('button').length).toBe(2);
  });

  it('should render first run if multiple runs were send', () => {
    const wrapper = shallow(<RunsOnMap {...defaultProps} />);
    expect(wrapper.props().children[0].props.path.length).toBe(firstRun.length);
  });

  it('should render correct runs after pressing buttons', () => {
    const wrapper = shallow(<RunsOnMap {...defaultProps} />);
    const getRunLength = () => wrapper.props().children[0].props.path.length;
    const nextButton = wrapper.find('button#next_run');
    const previousButton = wrapper.find('button#previous_run');
    nextButton.simulate('click');
    expect(getRunLength()).toBe(secondRun.length);
    nextButton.simulate('click');
    expect(getRunLength()).toBe(thirdRun.length);
    nextButton.simulate('click');
    expect(getRunLength()).toBe(firstRun.length);
    previousButton.simulate('click');
    expect(getRunLength()).toBe(thirdRun.length);
    previousButton.simulate('click');
    expect(getRunLength()).toBe(secondRun.length);
  });

});