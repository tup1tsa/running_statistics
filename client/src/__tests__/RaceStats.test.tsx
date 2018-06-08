import { shallow } from 'enzyme';
import { RaceStats } from '../RaceStats';
import * as React from 'react';
import { RacesOnMapFactory } from '../RacesOnMapFactory';
import { DividedPathPart } from '../Path/pathUtils';

describe('race statistics block', () => {

  const defaultProps = {
    downloadRaces: jest.fn(),
    divideRace: jest.fn()
  };

  it('should show notification if there are no races available', () => {
    const message = <p>No races are available</p>;
    const wrapper = (shallow(<RaceStats {...defaultProps} />, {disableLifecycleMethods: true}));
    expect(wrapper.contains(message)).toBe(true);
  });

  it('should show error notification if races download was unsuccessful', async (done) => {
    const errorMessage = 'some problems fetching errors';
    const downloadRaces = jest.fn().mockRejectedValue(new Error(errorMessage));
    const wrapper = shallow(<RaceStats {...defaultProps} downloadRaces={downloadRaces}/>);
    process.nextTick(() => {
      // async lifecycle method workaround
      wrapper.update();
      expect(wrapper.contains(<p>{errorMessage}</p>)).toBe(true);
      done();
    });
  });

  it('should pass correct props to Races on map component', async (done) => {
    const downloadRaces = jest.fn().mockResolvedValue([{
      type: 'walking',
      path: []
    }]);
    const dividedRace: DividedPathPart[] = [{active: true, path: []}];
    const divideRace = jest.fn().mockReturnValue(dividedRace);
    const wrapper = shallow(<RaceStats {...defaultProps} downloadRaces={downloadRaces} divideRace={divideRace} />);
    process.nextTick(() => {
      wrapper.update();
      const racesOnMapElem = <RacesOnMapFactory races={[dividedRace]} size={{width: 1000, height: 1000}} />;
      expect(wrapper.contains(racesOnMapElem)).toBe(true);
      done();
    });
  });

});