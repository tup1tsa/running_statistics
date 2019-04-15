import classnames from "classnames";
import React from "react";
import Popup from "reactjs-popup";
import "../../scss/molecules/Modal.scss";

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
  <Popup
    contentStyle={{ maxWidth: 450, borderRadius: 20 }}
    open={isOpen}
    onClose={onClose}
  >
    <div id="popupWrapper" className={classnames({ error: isError })}>
      <span>{text}</span>
    </div>
  </Popup>
);

export default Modal;
