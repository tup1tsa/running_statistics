import * as React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../Navigation';
import { RunStartPreparationFactory } from '../RunStartPreparationFactory';

describe('site navigation', () => {

  it('should have two buttons — start run and statistics', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find('button').length).toBe(2);
  });

  it('start run button should render race preparation block', () => {
    const wrapper = shallow(<Navigation />);
    const instance = wrapper.instance() as Navigation;
    const startButton = wrapper.find('#start_run');
    const preparationBlock = <RunStartPreparationFactory setSaveResult={instance.finishRun} />;
    startButton.simulate('click');
    expect(wrapper.contains(preparationBlock)).toBe(true);
  });

  it('should hide navigation if run is in progress', () => {
    const wrapper = shallow(<Navigation />);
    wrapper.find('#start_run').simulate('click');
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should render saving run message if it\'s defined', () => {
    const wrapper = shallow(<Navigation />);
    const instance = wrapper.instance() as Navigation;
    instance.finishRun('saved successfully');
    wrapper.update();
    expect(wrapper.contains(<p>saved successfully</p>)).toBe(true);
  });

});