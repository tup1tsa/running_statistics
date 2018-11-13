import { MESSAGES } from "../../application/common_files/config";
import {
  MessageData,
  MessageUrlInput,
  parseMessageUrl
} from "../../application/logic/parseMessageUrl";

export type ParseMessageUrlContainer = (
  urlInput: MessageUrlInput
) => MessageData;

export const parseMessageUrlContainer: ParseMessageUrlContainer = urlInput =>
  parseMessageUrl(urlInput, MESSAGES);
