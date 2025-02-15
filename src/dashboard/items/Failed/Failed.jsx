import React from "react";
import "./Failed.css";
import img from "../../../assets/imgs/Innovation-amico.svg";

export default function Failed({text}) {
  return (
    <div className="failed flex-col">
      <img src={img} />
      <h3>{text}</h3>
    </div>
  );
}
