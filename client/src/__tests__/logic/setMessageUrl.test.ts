import { setMessageUrlFactory } from "../../application/logic/setMessageUrl";

it("should create message url for error properly", () => {
  const messsages = ["first error", "second error"];
  const messageData = {
    message: messsages[1],
    isError: true
  };
  // first '1' is message id from messages list
  // second '1' — that's error
  expect(setMessageUrlFactory(messsages)(messageData)).toBe("/message/1/1");
});

it("should create message url for success properly", () => {
  const messsages = ["first success", "second success message", "last"];
  const messageData = {
    message: messsages[2],
    isError: false
  };
  // '2' — message id from the list
  // '0' — that's not an error
  expect(setMessageUrlFactory(messsages)(messageData)).toBe("/message/2/0");
});

it("should throw if message is not set in the list", () => {
  const list: string[] = [];
  expect(() =>
    setMessageUrlFactory(list)({ message: "error", isError: false })
  ).toThrow();
});
