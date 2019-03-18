import { shallow } from "enzyme";
import React from "react";
import { AutoLogin } from "../../application/components/AutoLogin";

it("should call login method on mount", () => {
  const login = jest.fn();
  shallow(<AutoLogin login={login} />);
  expect(login.mock.calls.length).toBe(1);
});
