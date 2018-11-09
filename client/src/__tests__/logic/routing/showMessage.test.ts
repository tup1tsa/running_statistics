import { showMessage } from "../../../application/logic/routing/showMessage";
import { setMessageUrl } from "../../../application/logic/setMessageUrl";

it("should call correct url", () => {
  const history = {
    push: jest.fn()
  };
  const messages = ["firstError", "secondError"];
  showMessage("secondError", true, history, setMessageUrl, messages);
  expect(history.push.mock.calls.length).toBe(1);
  expect(history.push.mock.calls[0][0]).toBe("/message/1/1");
});
