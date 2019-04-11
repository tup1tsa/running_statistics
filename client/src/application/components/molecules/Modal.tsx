import classnames from "classnames";
import React from "react";
import Popup from "reactjs-popup";
import "../../css/molecules/Modal.css";

interface Props {
  readonly text: string;
  readonly isOpen?: boolean;
  readonly isError?: boolean;
  readonly onClose?: () => void;
}

const Modal = ({
  text,
  isOpen = false,
  isError = false,
  onClose = () => null
}: Props) => (
  <Popup open={isOpen} onClose={onClose}>
    <div id="popupWrapper" className={classnames({ error: isError })}>
      <span>{text}</span>
    </div>
  </Popup>
);

export default Modal;
