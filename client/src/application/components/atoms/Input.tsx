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
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(target.value);
  };
  const fullLabel = label.toUpperCase() + errorLabelMessage;
  return (
    <div
      className={classnames("inputWrapper", {
        error: errorMessage
      })}
    >
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
