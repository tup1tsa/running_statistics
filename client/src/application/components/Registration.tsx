interface Props {
  readonly changeRegistrationField: () => void;
  readonly register: () => void;

  readonly loginError: string;
  readonly emailError: string;
  readonly passwordError: string;
}
