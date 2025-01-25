import React from "react";
import "./ProgressBar.css"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ value, width, height, color ,per}) => {
  return (
    <div
      style={{ width: `${width}`, height: `${height}`, position: "relative" }}
      className="progress"
    >
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3B30" />
            {/* <stop offset="100%" stopColor=" rgba(255, 59, 48, 0)" /> */}
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        value={55}
        // text={`${per?"+":""}${value}${per?"%":""}`}
        text={`+${55}%`}
        styles={buildStyles({
          pathColor: `${color ? color : "url(#gradient)"}  `, // Apply gradient from SVG
          textColor: "#fff",
          trailColor: "#d6d6d6",
          backgroundColor: "#fff",
          textSize: "20px",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default ProgressBar;
