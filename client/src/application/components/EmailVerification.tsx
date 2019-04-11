import React, { Component } from "react";
import Modal from "./molecules/Modal";

interface EmailVerificationStateProps {
  readonly match: {
    readonly params: {
      readonly hash: string;
    };
  };
  readonly error?: string;
  readonly inProgress: boolean;
}
interface EmailVerificationDispatchProps {
  verify: (hash: string) => void;
  removeErrors: () => void;
}
type Props = EmailVerificationStateProps & EmailVerificationDispatchProps;

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
