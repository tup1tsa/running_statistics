import * as React from 'react';
import { shallow } from 'enzyme';
import { PathInformation } from '../../Path/PathInformation';

describe('should render path information correctly', () => {

  const toLocaleTimeMock = jest.fn();
  toLocaleTimeMock.mockReturnValue('7 pm');

  const wrapper = shallow(
    <PathInformation
      runningType={'walking'}
      time={2323323}
      toLocaleTime={toLocaleTimeMock}
      avgSpeed={13.2563}
      totalDistance={23}
    />
  );

  it('should call to locale time function with time input', () => {
    expect(toLocaleTimeMock.mock.calls.length).toBe(1);
    expect(toLocaleTimeMock.mock.calls[0][0]).toBe(2323323);
  });

  it('should render 4 paragraphs', () => {
    expect(wrapper.find('li').length).toBe(4);
  });

  it('should render correct data', () => {
    // walking here is in upper case. It should be transformed just in case
    expect(wrapper.contains(<li>Walking is in progress.</li>)).toBe(true);
    expect(wrapper.contains(<li>Last check was at 7 pm</li>)).toBe(true);
    expect(wrapper.contains(<li>Average speed is 13.26 kmh</li>)).toBe(true);
    expect(wrapper.contains(<li>Total distance is 23 metres</li>)).toBe(true);
  });

});