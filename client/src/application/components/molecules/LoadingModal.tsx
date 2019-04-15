import React from "react";
import Popup from "reactjs-popup";
import "../../scss/molecules/LoadingModal.scss";

interface Props {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: Props) => (
  <Popup
    closeOnDocumentClick={false}
    closeOnEscape={false}
    contentStyle={{ border: "none", background: "none" }}
    open={isOpen}
  >
    <div className="loaderWrapper">
      <img src="/images/loader.gif" />
    </div>
  </Popup>
);

export default LoadingModal;
