import { MESSAGES } from "../common_files/config";
import { MessageData } from "./parseMessageUrl";

export type SetMessageUrl = (messageData: MessageData) => string;
type SetMessageUrlFactory = (messages: ReadonlyArray<string>) => SetMessageUrl;

export const setMessageUrlFactory: SetMessageUrlFactory = messages => ({
  message,
  isError
}) => {
  if (!messages.includes(message)) {
    throw new Error("message is not in the list");
  }
  return `/message/${messages.indexOf(message)}/${isError ? "1" : "0"}`;
};

export const setMessageUrl: SetMessageUrl = messageData =>
  setMessageUrlFactory(MESSAGES)(messageData);
