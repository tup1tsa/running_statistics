import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { Message } from "../../application/components/Message";
import Routes from "../../application/routes";

it("invalid path should return 404", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/random"]}>{Routes}</MemoryRouter>
  );
  expect(wrapper.find("#badUrl").length).toBe(1);
});

it("should render success message page", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/message/2/1"]}>{Routes}</MemoryRouter>
  );
  const message = wrapper.find(Message);
  expect(message.props().match.params.messageId).toBe("2");
  expect(message.props().match.params.isError).toBe("1");
});
