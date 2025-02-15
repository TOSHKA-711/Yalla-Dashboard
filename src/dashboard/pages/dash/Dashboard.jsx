import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DashLineChart from "../../items/lineChart/DashLineChart";
import Numbers from "../../components/numbers/Numbers";
// import SimpleBarChart from "../../items/BarChart/SimpleBarChart";
// import SimpleBarChart2 from "../../items/BarChart/SimpleBarChart2";
// import SimpleBarChart3 from "../../items/BarChart/SimpleBarChart3";
import MuiPieChart from "../../items/MuiPieChart/MuiPieChart";
import ProgressBar from "../../items/GradientCircular/progressBar";

import progressFrame from "../../../assets/imgs/Frame 66.png";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://app.yallapadel.club/public/dashboard/getRegistration`
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setError("Failed to load user data.");
  //     }
  //   };

  //   fetch();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://app.yallapadel.club/public/dashboard/getCardCounter`
  //       );
  //       setData2(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setError("Failed to load user data.");
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="dashboard flex-col">
      <Numbers
        // oneN={data2.total_users}
        oneN={"67"}
        oneC={"Total Customers"}
        // twoN={data2.users}
        twoN={"72"}
        twoC={"Users"}
        // threeN={data2.vendors}
        threeN={"20"}
        threeC={"Vendors"}
      />
      <Numbers
        // oneN={data2.total_items}
        oneN={"16"}
        oneC={"Total Items"}
        // twoN={data2.playgrounds}
        twoN={"9"}
        twoC={"Playgrounds"}
        // threeN={data2.bookings}
        threeN={"21"}
        threeC={"Bookings"}
      />

      <div className="f-charts row flex-row">
        <div className="child l-child flex-col flex-1">
          <h3>Registration</h3>
          <img src={progressFrame} />
          <div className="bars flex-row">
            <span className=" flex-col">
              <ProgressBar value={55} width="30%" height="80%" color={"red"} />
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
              <ProgressBar
                value={data.count_user_with_social_app}
                width="50%"
                height="80%"
                color={"red"}
                per={false}
              />
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
