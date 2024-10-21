import React, { useEffect, useState } from "react";
import "./Numbers.css";
import ProgressBar from "../../items/GradientCircular/progressBar";
import axios from "axios";
export default function Numbers({oneN,oneC,twoN,twoC,threeN,threeC}) {

  
  return (
    <div className="numbers row flex-row">
      <div className="child  flex-row">
  

        <span className=" flex-col">
          <h4>{oneC}</h4>
          <h2>{oneN}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={oneN} />
  
      </div>
      <div className="child flex-row">
        <span className=" flex-col">
          <h4>{twoC}</h4>
          <h2>{twoN}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={twoN} />
      </div>
      <div className="child flex-row">
        <span className=" flex-col">
          <h4>{threeC}</h4>
          <h2>{threeN}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={threeN} />
      </div>
    </div>
 
  );
}
