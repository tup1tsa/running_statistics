import { shallow } from "enzyme";
import * as React from "react";
import {
  MapWrapper,
  MapWrapperWithGoogleMap,
  MapWrapperWithScript
} from "../../../application/components/GoogleMap/MapWrapper";

describe("higher order component logic", () => {
  const defaultProps = {
    center: {
      latitude: 23,
      longitude: 44
    },
    zoom: 12
  };

  it("should render inner stateless component without props", () => {
    const InnerComponent = () => <span id="inner" />;
    const Hoc = MapWrapper(InnerComponent);
    const wrapper = shallow(<Hoc {...defaultProps} />);
    expect(
      wrapper
        .children()
        .dive()
        .is("span#inner")
    ).toBe(true);
  });

  it("should render inner stateless component with props", () => {
    interface Props {
      readonly name: string;
    }
    const InnerComponent = (props: Props) => <span data-name={props.name} />;
    const Hoc = MapWrapper(InnerComponent);
    const wrapper = shallow(<Hoc name="sasha" {...defaultProps} />);
    expect(
      wrapper
        .children()
        .dive()
        .is('[data-name="sasha"]')
    ).toBe(true);
  });

  it("map should convert and render center and zoom props correctly", () => {
    const InnerComponent = () => <div />;
    const Hoc = MapWrapper(InnerComponent);
    const wrapper = shallow(<Hoc {...defaultProps} />);
    const centerConverted = {
      lat: 23,
      lng: 44
    };
    expect(wrapper.props().defaultCenter).toEqual(centerConverted);
    expect(wrapper.props().defaultZoom).toBe(defaultProps.zoom);
  });

  it("should render container element and map element with correct size", () => {
    const InnerComponent = () => <span />;
    const Hoc = MapWrapper(InnerComponent);
    const size = {
      width: 400,
      height: 400
    };
    const HocWithGoogleMap = MapWrapperWithGoogleMap(Hoc);
    const wrapper = shallow(<HocWithGoogleMap {...defaultProps} {...size} />);
    const mapElement = <div style={{ height: "100%" }} />;
    expect(wrapper.props().mapElement).toEqual(mapElement);
    const containerElement = (
      <div
        style={{
          float: "left",
          height: `${size.height}px`,
          width: `${size.width}px`
        }}
      />
    );
    expect(wrapper.props().containerElement).toEqual(containerElement);
  });

  it("should pass correct url to wrapper with script", () => {
    const InnerComponent = class extends React.Component {
      public render() {
        return <div />;
      }
    };
    const defaultUrl = "http://abba";
    const processEnv = {
      Random_Key: "232",
      REACT_APP_GOOGLE_MAPS_KEY: "bar"
    };
    const expectedUrl = `${defaultUrl}&key=${
      processEnv.REACT_APP_GOOGLE_MAPS_KEY
    }`;
    const loadingElement = <div style={{ height: "100%" }} />;
    const Hoc = MapWrapperWithScript(InnerComponent);
    const wrapper = shallow(
      <Hoc googleMapDefaultUrl={defaultUrl} processEnv={processEnv} />
    );
    expect(wrapper.props().googleMapURL).toBe(expectedUrl);
    expect(wrapper.props().loadingElement).toEqual(loadingElement);
  });
});
