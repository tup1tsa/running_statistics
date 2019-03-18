import { loginStart } from "../../application/actions/actionCreators";
import { mapDispatchToProps } from "../../application/connectors/AutoLoginConnector";

it("should call login request", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  props.login();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual(loginStart());
});
