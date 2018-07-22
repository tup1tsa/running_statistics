import { shallow } from 'enzyme';
import * as React from 'react';
import { Polyline } from 'react-google-maps';
import { SparsePolyline } from '../../application/GoogleMap/SparsePolyline';

describe('sparse polyline logic', () => {

  const path = [
    {color: 'black', positions: [{latitude: 17, longitude: 23}]},
    {color: 'white', positions: [{latitude: 22, longitude: 17}]}
  ];
  const firstPolylinePath = [{lat: 17, lng: 23}];
  const firstPolyline = <Polyline path={firstPolylinePath} options={{strokeColor: path[0].color}} />;
  const secondPolylinePath = [{lat: 22, lng: 17}];
  const secondPolyline = <Polyline path={secondPolylinePath} options={{strokeColor: path[1].color}} />;

  it('should return correct polylines', () => {
    const wrapper = shallow(<SparsePolyline path={path}/>);
    expect(wrapper.contains(firstPolyline)).toBe(true);
    expect(wrapper.contains(secondPolyline)).toBe(true);
  });

});