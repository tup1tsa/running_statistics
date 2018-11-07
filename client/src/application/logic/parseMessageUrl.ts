export interface MessageData {
  readonly message: string;
  readonly isError: boolean;
}

export interface MessageUrlInput {
  readonly messageId: string;
  readonly isError: "0" | "1";
}

export type ParseMessageUrl = (
  messageUrlInput: MessageUrlInput,
  messages: ReadonlyArray<string>
) => MessageData;

export const parseMessageUrl: ParseMessageUrl = (messageUrlInput, messages) => {
  const isError = messageUrlInput.isError === "1";
  const messageId = Math.abs(parseInt(messageUrlInput.messageId, 10));
  if (Number.isNaN(messageId)) {
    return { isError, message: messages[0] };
  }
  return {
    isError: messageUrlInput.isError === "1",
    message:
      messages[messageId] === undefined ? messages[0] : messages[messageId]
  };
};
