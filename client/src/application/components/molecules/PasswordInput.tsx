import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "../../css/molecules/PasswordInput.css";
import { Input } from "../atoms/Input";

interface Props {
  readonly id: string;
  readonly label: string;

  readonly onChange: (value: string) => void;
  readonly errorMessage?: string;
}

interface State {
  readonly isPasswordVisible: boolean;
}

export class PasswordInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPasswordVisible: false
    };

    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }
  public togglePasswordVisibility() {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  }
  public render() {
    const { isPasswordVisible } = this.state;
    const iconName = isPasswordVisible ? "eye" : "eye-slash";
    const type = isPasswordVisible ? "text" : "password";
    return (
      <Input
        {...this.props}
        type={type}
        rightIcon={
          <div className="iconWrapper" onClick={this.togglePasswordVisibility}>
            <FontAwesomeIcon icon={iconName} />
          </div>
        }
      />
    );
  }
}
