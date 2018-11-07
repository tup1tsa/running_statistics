import { MessageData } from "./parseMessageUrl";

export type SetMessageUrl = (
  messageData: MessageData,
  messages: ReadonlyArray<string>
) => string;

export const setMessageUrl: SetMessageUrl = (
  { message, isError },
  messages
) => {
  if (!messages.includes(message)) {
    throw new Error("message is not in the list");
  }
  return `/message/${messages.indexOf(message)}/${isError ? "1" : "0"}`;
};
