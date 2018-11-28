import React, { ChangeEvent } from "react";

type OnChangeHandler = (value: string) => void;

interface Props {
  readonly id: string;
  readonly label: string;

  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly type?: string;

  readonly onChange?: OnChangeHandler;
  readonly errorMessage?: string;
}

export const Input = (props: Props) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange) {
      return;
    }
    props.onChange(event.target.value);
  };
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type ? props.type : "text"}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
      />
      {props.errorMessage ? (
        <p className="inputError">{props.errorMessage}</p>
      ) : null}
    </div>
  );
};
