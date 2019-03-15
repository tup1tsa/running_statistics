import { mount } from "enzyme";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { createStore } from "redux";
import { Message } from "../../application/components/Message";
import PathWatcherContainer from "../../application/connectors/PathWatcherConnector";
import RaceStartPreparationContainer from "../../application/connectors/RaceStartPreparationConnector";
import rootReducer from "../../application/reducers/rootReducer";
import Routes from "../../application/routes";

const store = createStore(rootReducer(createBrowserHistory()));

it("invalid path should return 404", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/random"]}>{Routes}</MemoryRouter>
  );
  expect(wrapper.find("#badUrl").length).toBe(1);
});

it("should render error message page", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/message/ZnNkZg==/1"]}>
      {Routes}
    </MemoryRouter>
  );
  const message = wrapper.find(Message);
  expect(message.props().match.params.encodedMessage).toBe("ZnNkZg==");
  expect(message.props().match.params.isError).toBe("1");
});

it("should render empty page by default", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{Routes}</MemoryRouter>
    </Provider>
  );
  expect(wrapper.find("div").props()).toEqual({});
});

it("should render start race page", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/startRace"]}>{Routes}</MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(RaceStartPreparationContainer).length).toBe(1);
});

it("should render current race page", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/race/walking"]}>{Routes}</MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(PathWatcherContainer).length).toBe(1);
});
