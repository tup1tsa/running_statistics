import * as React from "react";
import { MESSAGES } from "../common_files/config";

interface Props {
  readonly match: {
    readonly params: {
      readonly messageId: string;
      readonly isError: "0" | "1";
    };
  };
}

export const Message = (props: Props) => {
  const { messageId, isError } = props.match.params;
  const id = parseInt(messageId, 10);
  const defaultError = "Unexpected error occured";
  if (Number.isNaN(id) || MESSAGES[id] === undefined) {
    return <div className="errorMessage">{defaultError}</div>;
  }
  const message = MESSAGES[id];
  if (isError === "1") {
    return <div className="errorMessage">{message}</div>;
  }
  return <div>{message}</div>;
};
