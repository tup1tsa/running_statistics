import { MESSAGES } from "../../../application/common_files/config";
import { showMessage } from "../../../application/logic/routing/showMessage";
import { setMessageUrl } from "../../../application/logic/setMessageUrl";
import { history } from "../../reducers/rootReducerContainer";

export type ShowMessageContainer = (message: string, isError: boolean) => void;

export const showMessageContainer: ShowMessageContainer = (message, isError) =>
  showMessage(message, isError, history, setMessageUrl, MESSAGES);
