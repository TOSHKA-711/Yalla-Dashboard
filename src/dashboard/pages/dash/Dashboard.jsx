import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import DashLineChart from "../../items/lineChart/DashLineChart";
import Numbers from "../../components/numbers/Numbers";
import SimpleBarChart from "../../items/BarChart/SimpleBarChart";
import SimpleBarChart2 from "../../items/BarChart/SimpleBarChart2";
import SimpleBarChart3 from "../../items/BarChart/SimpleBarChart3";
import MuiPieChart from "../../items/MuiPieChart/MuiPieChart";
import ProgressBar from "../../items/GradientCircular/progressBar";

import progressFrame from "../../../assets/imgs/Frame 66.png";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          // `/api/public/dashboard/getRegistration`
          `https://app.yallapadel.club/public/dashboard/getRegistration`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
      }
    };

    fetch();
  }, []);

  return (
    <div className="dashboard flex-col">
      <Numbers />
      <div className="f-charts row flex-row">
        <div className="child l-child flex-col flex-1">
          <h3>Registration</h3>
          <img src={progressFrame} />
          <div className="bars flex-row">
            <span className=" flex-col">
              <ProgressBar value={45} width="30%" height="80%" color={"red"} />
              <p>social media</p>
            </span>
            <span className=" flex-col">
              <ProgressBar value={75} width="30%" height="80%" color={"red"} />
              <p>Log in</p>
            </span>
          </div>
        </div>

        {/* <div className="child flex-col flex-1">
          <h3>Revenue By</h3>
          <SimpleBarChart />
        </div> */}

        <div className="child flex-col flex-1">
          <h3>Total Revenue</h3>
          <MuiPieChart />
        </div>
      </div>
      <div className="l-charts row flex-row">
        {/* <div className="child flex-col flex-1">
          <h3>Revenue By</h3>
          <SimpleBarChart2 />
        </div> */}
        {/* <div className="child flex-col flex-1">
          <h3>All Activity</h3>
          <SimpleBarChart3 />
        </div> */}
      </div>
      <div className=" charts f-charts row flex-row">
        <div className="child l-child flex-col flex-1">
          <h3>Registrations</h3>
          <img src={progressFrame} />
          <div className="bars flex-row">
            <span className=" flex-col">
              <ProgressBar
                value={data.count_user_without_social_app}
                width="50%"
                height="80%"
                color={"red"}
                per={false}
              />
              <p>social media</p>
            </span>
            <span className=" flex-col">
              <ProgressBar value={75} width="50%" height="80%" color={"red"} />
              <p>Log in</p>
            </span>
          </div>
        </div>
        {/* <div className="child flex-col flex-1">
          <h3>Revenue By</h3>
          <SimpleBarChart />
        </div> */}
        <div className="child flex-col flex-1">
          <h3>Total Customers</h3>
          <MuiPieChart />
        </div>
        {/* <div className="child flex-col flex-1">
          <h3>Revenue By</h3>
          <SimpleBarChart2 />
        </div> */}
        {/* <div className="child flex-col flex-1">
          <h3>All Activity</h3>
          <SimpleBarChart3 />
        </div> */}
        <div className="child flex-col total flex-1">
          <h3>Total Revenue</h3>
          <DashLineChart />
        </div>
      </div>
    </div>
  );
}
