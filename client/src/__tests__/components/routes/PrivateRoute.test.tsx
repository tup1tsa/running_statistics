import { mount } from "enzyme";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { createStore } from "redux";
import { PrivateRoute } from "../../../application/components/routes/PrivateRoute";
import AuthCheckerConnector from "../../../application/connectors/AuthCheckerConnector";
import rootReducerFactory from "../../../application/reducers/rootReducer";

it("should render AuthChecker component if user is not authorized", () => {
  const checkAuth = jest.fn().mockReturnValue(false);
  const component = () => <div />;
  const history = createBrowserHistory();
  const store = createStore(rootReducerFactory(history));
  const element = mount(
    <Provider store={store}>
      <MemoryRouter>
        <PrivateRoute checkAuth={checkAuth} component={component} />
      </MemoryRouter>
    </Provider>
  );
  expect(element.find(AuthCheckerConnector).length).toBe(1);
});

it("should render provided component if user is authorized", () => {
  const checkAuth = jest.fn().mockReturnValue(true);
  const component = () => <div>some text</div>;
  const history = createBrowserHistory();
  const store = createStore(rootReducerFactory(history));
  const element = mount(
    <Provider store={store}>
      <MemoryRouter>
        <PrivateRoute checkAuth={checkAuth} component={component} />
      </MemoryRouter>
    </Provider>
  );
  expect(element.find("div").text()).toBe("some text");
});
