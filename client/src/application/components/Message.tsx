import React from "react";
interface MessageUrlInput {
  readonly encodedMessage: string;
  readonly isError: "0" | "1";
}
interface Props {
  readonly match: {
    readonly params: MessageUrlInput;
  };
}

export const Message = (props: Props) => {
  const { encodedMessage, isError } = props.match.params;
  const message = atob(encodedMessage);
  if (isError === "1") {
    return <div className="errorMessage">{message}</div>;
  }
  return <div>{message}</div>;
};
