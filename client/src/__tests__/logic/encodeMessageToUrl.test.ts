import { encodeMessageToUrl } from "../../application/logic/encodeMessageToUrl";

it("should create message url for error properly", () => {
  const message = "something bad happened";
  const encodedMessage = btoa(message);
  const messageData = {
    message,
    isError: true
  };
  expect(encodeMessageToUrl(messageData)).toBe(`/message/${encodedMessage}/1`);
});

it("should create message url for success properly", () => {
  const message = "everything is fine";
  const encodedMessage = btoa(message);
  const messageData = {
    message,
    isError: false
  };
  expect(encodeMessageToUrl(messageData)).toBe(`/message/${encodedMessage}/0`);
});
