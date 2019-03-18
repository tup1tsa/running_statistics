import { Component } from "react";

export interface AutoLoginProps {
  login: () => void;
}

export class AutoLogin extends Component<AutoLoginProps> {
  public componentDidMount() {
    this.props.login();
  }
  public render() {
    return null;
  }
}
