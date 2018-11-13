import { MESSAGES } from "../../application/common_files/config";
import { MessageData } from "../../application/logic/parseMessageUrl";
import { setMessageUrl } from "../../application/logic/setMessageUrl";

export type SetMessageUrlContainer = (messageData: MessageData) => string;

export const setMessageUrlContainer: SetMessageUrlContainer = messageData =>
  setMessageUrl(messageData, MESSAGES);
