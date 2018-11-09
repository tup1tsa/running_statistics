import { SetMessageUrl } from "../setMessageUrl";

export type ShowMessage = (
  message: string,
  isError: boolean,
  history: { readonly push: (path: string) => void },
  setMessageUrl: SetMessageUrl,
  messages: ReadonlyArray<string>
) => void;

export const showMessage: ShowMessage = (
  message,
  isError,
  history,
  setMessageUrl,
  messages
) => {
  const url = setMessageUrl({ message, isError }, messages);
  history.push(url);
};
