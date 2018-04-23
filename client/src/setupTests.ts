import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new ReactSixteenAdapter() });

// tslint:disable-next-line no-any
const globalAny: any = global;

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn()
};
globalAny.localStorage = localStorageMock;