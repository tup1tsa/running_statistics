import React, { Component } from "react";
import Modal from "../molecules/Modal";

interface MatchProps {
  readonly match: {
    readonly params: {
      readonly hash: string;
    };
  };
}
export interface EmailVerificationStateProps {
  readonly error?: string;
  readonly inProgress: boolean;
}
export interface EmailVerificationDispatchProps {
  verify: (hash: string) => void;
  removeErrors: () => void;
}
type Props = EmailVerificationStateProps &
  EmailVerificationDispatchProps &
  MatchProps;

class EmailVerification extends Component<Props> {
  public componentDidMount() {
    const { verify, match } = this.props;
    verify(match.params.hash);
  }
  public render() {
    const { error, inProgress, removeErrors } = this.props;
    return (
      <div>
        <Modal
          isOpen={!!error}
          text={error ? error : ""}
          isError={true}
          onClose={removeErrors}
        />
        {inProgress ? <p>Please, wait.</p> : null}
      </div>
    );
  }
}

export default EmailVerification;
