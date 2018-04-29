import * as React from 'react';
import { shallow } from 'enzyme';
import { MapWrapper, MapWrapperWithGoogleMap, MapWrapperWithScript } from '../../GoogleMap/MapWrapper';

describe('higher order component logic', () => {

  const defaultProps = {
    center: {
      latitude: 23,
      longitude: 44,
    },
    zoom: 12
  };

  it('should render inner stateless component without props', () => {
    const InnerComponent = () => <span id="inner" />;
    const Hoc = MapWrapper(InnerComponent, defaultProps);
    const wrapper = shallow(<Hoc />);
    expect(wrapper.children().dive().is('span#inner')).toBe(true);
  });

  it('should render inner stateless component with props', () => {
    const InnerComponent = ({name}: {name: string}) => <span data-name={name} />;
    const Hoc = MapWrapper(InnerComponent, defaultProps);
    const wrapper = shallow(<Hoc name="sasha" />);
    expect(wrapper.children().dive().is('[data-name="sasha"]')).toBe(true);
  });

  it('map should convert and render center and zoom props correctly', () => {
    const InnerComponent = () => <div />;
    const Hoc = MapWrapper(InnerComponent, defaultProps);
    const wrapper = shallow(<Hoc />);
    const centerConverted = {
      lat: 23,
      lng: 44
    };
    expect(wrapper.props().defaultCenter).toEqual(centerConverted);
    expect(wrapper.props().defaultZoom).toBe(defaultProps.zoom);
  });

  it('should render container element and map element with correct size', () => {
    const InnerComponent = () => <span />;
    const Hoc = MapWrapper(InnerComponent, defaultProps);
    const size = {
      width: 400,
      height: 400
    };
    const HocWithGoogleMap = MapWrapperWithGoogleMap(Hoc, size);
    const wrapper = shallow(<HocWithGoogleMap />);
    const mapElement = <div style={{height: '100%'}} />;
    expect(wrapper.props().mapElement).toEqual(mapElement);
    const containerElement = <div style={{height: `${size.height}px`, width: `${size.width}px`}}/>;
    expect(wrapper.props().containerElement).toEqual(containerElement);
  });

  it('should pass correct url to wrapper with script', () => {
    const InnerComponent = class extends React.Component {
      render() {
        return <div />;
      }
    };
    const defaultUrl = 'http://abba';
    const processEnv = {
      Random_Key: '232',
      REACT_APP_GOOGLE_MAPS_KEY: 'bar'
    };
    const expectedUrl = `${defaultUrl}&key=${processEnv.REACT_APP_GOOGLE_MAPS_KEY}`;
    const loadingElement = <div style={{height: '100%'}} />;
    const Hoc = MapWrapperWithScript(InnerComponent, {googleMapDefaultUrl: defaultUrl, processEnv});
    const wrapper = shallow(<Hoc />);
    expect(wrapper.props().googleMapURL).toBe(expectedUrl);
    expect(wrapper.props().loadingElement).toEqual(loadingElement);
  });

});
