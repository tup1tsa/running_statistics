export interface MessageData {
  readonly message: string;
  readonly isError: boolean;
}

export interface MessageUrlInput {
  readonly messageId: string;
  readonly isError: "0" | "1";
}

export type ParseMessageUrl = (
  urlInput: MessageUrlInput,
  messages: ReadonlyArray<string>
) => MessageData;

export const parseMessageUrl: ParseMessageUrl = (urlInput, messages) => {
  const isError = urlInput.isError === "1";
  const messageId = Math.abs(parseInt(urlInput.messageId, 10));
  if (Number.isNaN(messageId)) {
    return { isError, message: messages[0] };
  }
  return {
    isError: urlInput.isError === "1",
    message:
      messages[messageId] === undefined ? messages[0] : messages[messageId]
  };
};
