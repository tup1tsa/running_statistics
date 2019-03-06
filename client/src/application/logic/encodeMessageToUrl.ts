export interface MessageData {
  readonly message: string;
  readonly isError: boolean;
}

export type EncodeMessageToUrl = (messageData: MessageData) => string;

export const encodeMessageToUrl: EncodeMessageToUrl = ({
  message,
  isError
}) => {
  return `/message/${btoa(message)}/${isError ? "1" : "0"}`;
};
