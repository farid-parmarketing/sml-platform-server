import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularBar = ({ percent }) => {
  return (
    <div style={{ width: "60px", height: "60px" }}>
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#75d526",
          trailColor: "#2877ff",
        })}
      />
    </div>
  );
};

export default CircularBar;
