import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const LabelInfo = ({ showInfoModal, infoModalData }) => {
  const { infoTooltip } = useContext(AppContext);
  return (
    <div
      className={`info-tooltip ${showInfoModal ? "active" : ""}`}
      ref={infoTooltip}
    >
      <p>{infoModalData}</p>
    </div>
  );
};

export default LabelInfo;
