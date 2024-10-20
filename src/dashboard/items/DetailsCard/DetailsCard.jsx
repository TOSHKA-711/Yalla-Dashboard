import React from "react";
import "./DetailsCard.css"

const DetailsCard = ({first , last , icon , third}) => {
  return (
    <div className="DetailsCard">
      <p className="time-text">
        <span>{first}</span>
        <span className="time-sub-text">{third}</span>
      </p>
      <p className="day-text">{last}</p>
      {icon}
    </div>
  );
};

export default DetailsCard;
