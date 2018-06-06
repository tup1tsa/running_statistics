import * as React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../Navigation';
import { RaceStartPreparationFactory } from '../RaceStartPreparationFactory';

describe('site navigation', () => {

  it('should have two buttons — start race and statistics', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find('button').length).toBe(2);
  });

  it('start race button should render race preparation block', () => {
    const wrapper = shallow(<Navigation />);
    const instance = wrapper.instance() as Navigation;
    const startButton = wrapper.find('#start_race');
    const preparationBlock = <RaceStartPreparationFactory setSaveResult={instance.finishRace} />;
    startButton.simulate('click');
    expect(wrapper.contains(preparationBlock)).toBe(true);
  });

  it('should hide navigation if race is in progress', () => {
    const wrapper = shallow(<Navigation />);
    wrapper.find('#start_race').simulate('click');
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should render saving race message if it\'s defined', () => {
    const wrapper = shallow(<Navigation />);
    const instance = wrapper.instance() as Navigation;
    instance.finishRace('saved successfully');
    wrapper.update();
    expect(wrapper.contains(<p>saved successfully</p>)).toBe(true);
  });

});