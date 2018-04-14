import { RunsHistory } from '../RunsHistory';
import { shallow } from 'enzyme';
import * as React from 'react';

it('should start new history after clicking on start button', () => {
  const wrapper = shallow(<RunsHistory/>);
  const button = wrapper.find('button');
  button.simulate('click');
  const instance = wrapper.instance() as RunsHistory;
  expect(instance.state.runs.length).toBe(0);
});

it('should load history from the client after clicking load history', () => {
  // inject file reader here. Mock it
});