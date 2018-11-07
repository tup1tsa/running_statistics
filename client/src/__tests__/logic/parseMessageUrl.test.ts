import { parseMessageUrl } from "../../application/logic/parseMessageUrl";

const messages = ["first", "second", "last"];

it("should parse errors properly", () => {
  expect(parseMessageUrl({ messageId: "1", isError: "1" }, messages)).toEqual({
    isError: true,
    message: messages[1]
  });
});

it("should parse success messages properly", () => {
  expect(parseMessageUrl({ messageId: "1", isError: "0" }, messages)).toEqual({
    isError: false,
    message: messages[1]
  });
});

it("should return first message if message id is not a number", () => {
  expect(parseMessageUrl({ messageId: "sfa", isError: "0" }, messages)).toEqual(
    {
      isError: false,
      message: messages[0]
    }
  );
});

it("should ignore sign in message id", () => {
  expect(parseMessageUrl({ messageId: "-1", isError: "0" }, messages)).toEqual({
    isError: false,
    message: messages[1]
  });
});

it("should return first message if message is not in the list", () => {
  expect(parseMessageUrl({ messageId: "150", isError: "0" }, messages)).toEqual(
    {
      isError: false,
      message: messages[0]
    }
  );
});
