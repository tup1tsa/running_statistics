import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn()
};
global.localStorage = localStorageMock;
