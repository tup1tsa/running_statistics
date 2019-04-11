import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import loadIcons from "./loadIcons";

loadIcons();

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn()
};
global.localStorage = localStorageMock;
