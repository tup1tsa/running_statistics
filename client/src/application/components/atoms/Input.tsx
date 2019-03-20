import classnames from "classnames";
import React, { ChangeEvent } from "react";
import "../../css/atoms/Input.css";

type OnChangeHandler = (value: string) => void;

interface Props {
  readonly id: string;
  readonly label: string;

  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly type?: "text" | "password";

  readonly onChange?: OnChangeHandler;
  readonly errorMessage?: string;

  readonly rightIcon?: JSX.Element;
}

// styles are taken from here
// https://codepen.io/tylernj42/pen/BoxzaQ/

export const Input = ({
  id,
  label,
  defaultValue,
  placeholder,
  type = "text",
  onChange,
  errorMessage,
  rightIcon
}: Props) => {
  const errorLabelMessage = errorMessage ? ` (${errorMessage})` : "";
  const fullLabel = label.toUpperCase() + errorLabelMessage;
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(event.target.value);
  };
  return (
    <div className={classnames("inputWrapper", { error: errorMessage })}>
      <label htmlFor={id}>{fullLabel}</label>
      <div className="iconInputWrapper">
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        {rightIcon}
      </div>
    </div>
  );
};
