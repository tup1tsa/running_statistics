import { mount } from "enzyme";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { createStore } from "redux";
import { Message } from "../../../application/components/Message";
import Routes from "../../../application/components/routes/Routes";
import RegistrationConnector from "../../../application/connectors/Auth/RegistrationConnector";
import PathWatcherConnector from "../../../application/connectors/PathWatcherConnector";
import RaceStartPreparationConnector from "../../../application/connectors/RaceStartPreparationConnector";
import RaceViewerConnector from "../../../application/connectors/RaceViewerConnector";
import rootReducer from "../../../application/reducers/rootReducer";

const store = createStore(rootReducer(createBrowserHistory()));

it("invalid path should return 404", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/random"]}>
      <Routes checkAuth={jest.fn()} />
    </MemoryRouter>
  );
  expect(wrapper.find("#badUrl").length).toBe(1);
});

it("should render error message page", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/message/ZnNkZg==/1"]}>
      <Routes checkAuth={jest.fn()} />
    </MemoryRouter>
  );
  const message = wrapper.find(Message);
  expect(message.props().match.params.encodedMessage).toBe("ZnNkZg==");
  expect(message.props().match.params.isError).toBe("1");
});

it("should render empty page by default", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes checkAuth={jest.fn()} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find("div").props()).toEqual({});
});

it("should render start race page if user is authorized", () => {
  const checkAuth = jest.fn().mockReturnValue(true);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/startRace"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RaceStartPreparationConnector).length).toBe(1);
});

it("should not render start race page if user is unauthorized", () => {
  const checkAuth = jest.fn().mockReturnValue(false);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/startRace"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RaceStartPreparationConnector).length).toBe(0);
});

it("should render current race page if user is authorized", () => {
  const checkAuth = jest.fn().mockReturnValue(true);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/race/walking"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(PathWatcherConnector).length).toBe(1);
});

it("should not render current race page if user is unauthorized", () => {
  const checkAuth = jest.fn().mockReturnValue(false);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/race/walking"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(PathWatcherConnector).length).toBe(0);
});

it("should render detailed race stats page is user is authorized", () => {
  const checkAuth = jest.fn().mockReturnValue(true);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/detailedRaceStats"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RaceViewerConnector).length).toBe(1);
});

it("should not render detailed race stats page is user is unauthorized", () => {
  const checkAuth = jest.fn().mockReturnValue(false);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/detailedRaceStats"]}>
        <Routes checkAuth={checkAuth} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RaceViewerConnector).length).toBe(0);
});

it("should render registration page", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/registration"]}>
        <Routes checkAuth={jest.fn()} />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RegistrationConnector).length).toBe(1);
});
