import * as React from 'react';
import { shallow } from 'enzyme';
import { RaceViewerSlider } from '../RaceViewerSlider';
import Slider from 'rc-slider';

describe('race viewer sliders', () => {

  const defaultProps = {
    handleChange: jest.fn(),
    defaults: {
      startSliderValue: 0,
      finishSliderValue: 100
    }
  };

  it('should initiate state properly', () => {
    const wrapper = shallow(<RaceViewerSlider {...defaultProps} />);
    const instance = wrapper.instance();
    expect(instance.state).toEqual({
      startSlider: defaultProps.defaults.startSliderValue,
      finishSlider: defaultProps.defaults.finishSliderValue
    });
  });

  it('should pass correct props to sliders', () => {
    const wrapper = shallow(<RaceViewerSlider {...defaultProps} />);
    const instance = wrapper.instance() as RaceViewerSlider;
    const startSlider = (
      <Slider
        vertical={true}
        defaultValue={defaultProps.defaults.startSliderValue}
        onAfterChange={instance.handleStartSliderChange}
      />
    );
    const finishSlider = (
      <Slider
        vertical={true}
        defaultValue={defaultProps.defaults.finishSliderValue}
        onAfterChange={instance.handleFinishSliderChange}
      />
    );
    expect(wrapper.contains(startSlider)).toBe(true);
    expect(wrapper.contains(finishSlider)).toBe(true);
  });

  it('finish slider should be adjusted to make sure it is not smaller than start slider', () => {
    const wrapper = shallow(<RaceViewerSlider {...defaultProps} />);
    const instance = wrapper.instance() as RaceViewerSlider;
    instance.setState({
      startSlider: 24,
      finishSlider: 52
    });
    instance.handleStartSliderChange(48);
    expect(instance.state).toEqual({
      startSlider: 48,
      finishSlider: 52
    });
    instance.handleStartSliderChange(75);
    expect(instance.state).toEqual({
      startSlider: 75,
      finishSlider: 75
    });
  });

  it('start slider should be adjusted to make sure it is not bigger than finish slider', () => {
    const wrapper = shallow(<RaceViewerSlider {...defaultProps} />);
    const instance = wrapper.instance() as RaceViewerSlider;
    instance.setState({
      startSlider: 24,
      finishSlider: 52
    });
    instance.handleFinishSliderChange(48);
    expect(instance.state).toEqual({
      startSlider: 24,
      finishSlider: 48
    });
    instance.handleFinishSliderChange(17);
    expect(instance.state).toEqual({
      startSlider: 17,
      finishSlider: 17
    });
  });

  it('should call handle change on update of either slider', () => {
    const handleChangeMock = jest.fn();
    const wrapper = shallow(<RaceViewerSlider {...defaultProps} handleChange={handleChangeMock} />);
    const instance = wrapper.instance() as RaceViewerSlider;
    instance.handleStartSliderChange(12);
    instance.handleFinishSliderChange(78);
    expect(handleChangeMock.mock.calls.length).toBe(2);
    expect(handleChangeMock.mock.calls[0]).toEqual([12, 100]);
    expect(handleChangeMock.mock.calls[1]).toEqual([12, 78]);
  });
});