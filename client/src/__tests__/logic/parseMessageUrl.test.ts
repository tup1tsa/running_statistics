import { parseMessageUrlFactory } from "../../application/logic/parseMessageUrl";

const messages = ["first", "second", "last"];

it("should parse errors properly", () => {
  expect(
    parseMessageUrlFactory(messages)({ messageId: "1", isError: "1" })
  ).toEqual({
    isError: true,
    message: messages[1]
  });
});

it("should parse success messages properly", () => {
  expect(
    parseMessageUrlFactory(messages)({ messageId: "1", isError: "0" })
  ).toEqual({
    isError: false,
    message: messages[1]
  });
});

it("should return first message if message id is not a number", () => {
  expect(
    parseMessageUrlFactory(messages)({ messageId: "sfa", isError: "0" })
  ).toEqual({
    isError: false,
    message: messages[0]
  });
});

it("should ignore sign in message id", () => {
  expect(
    parseMessageUrlFactory(messages)({ messageId: "-1", isError: "0" })
  ).toEqual({
    isError: false,
    message: messages[1]
  });
});

it("should return first message if message is not in the list", () => {
  expect(
    parseMessageUrlFactory(messages)({ messageId: "150", isError: "0" })
  ).toEqual({
    isError: false,
    message: messages[0]
  });
});
