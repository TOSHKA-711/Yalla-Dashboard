import React, { useEffect, useState } from "react";
import "./Numbers.css";
import ProgressBar from "../../items/GradientCircular/progressBar";
import axios from "axios";
export default function Numbers() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/public/dashboard/getCardCounter`
        );
        setData(response.data);
        // console.log(response.data);
    
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
      } 
    };

      fetchData();
 
  }, []);
  
  return (
    <div className="numbers row flex-row">
      <div className="child  flex-row">
  

        <span className=" flex-col">
          <h4>Total Users</h4>
          <h2>{data.users}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={70} />
  
      </div>
      <div className="child flex-row">
        <span className=" flex-col">
          <h4>Total Vendors</h4>
          <h2>{data.vendors}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={40} />
      </div>
      <div className="child flex-row">
        <span className=" flex-col">
          <h4>Total Ads</h4>
          <h2>{data.total_items}</h2>
        </span>
        <ProgressBar per={true} width="20%" height="80%" value={70} />
      </div>
    </div>
 
  );
}
