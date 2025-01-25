// import React, { useContext, useEffect, useState } from "react";
// import "./ItemDetailsPage.css";
// import waiting from "../../../assets/imgs/Waiting-amico.svg";
// import { MyContext } from "../../ContextApi/Provider";
// import { FaMapLocationDot } from "react-icons/fa6";
// import DetailsCard from "../../items/DetailsCard/DetailsCard";
// import { PiCourtBasketballFill } from "react-icons/pi";
// import { FaSackDollar } from "react-icons/fa6";
// import { BsCalendar2DateFill } from "react-icons/bs";
// import { FaClock } from "react-icons/fa";
// import { IoDocumentSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ImagesSlider from "../../items/ImagesSlider/ImagesSlider";

// // MUI Imports
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
// import ItemPage from "../ItemPage/ItemPage";
// import Failed from "../../items/Failed/Failed";
// import { CircularProgress } from "@mui/material";

// export default function ItemDetailsPage() {
//   const { selectedFacility, selectedAd } = useContext(MyContext);
//   const [expanded, setExpanded] = useState(false);
//   const [user, setUser] = useState({});
//   const [scheduled, setScheduled] = useState([]);
//   const [times, setTimes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timesLoading, setTimesLoading] = useState(false);

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   useEffect(() => {
//     const fetchUser = async () => {
//       await delay(1000);
//       try {
//         const response = await axios.get(
//           `https://app.yallapadel.club/public/dashboard/getItem/${selectedAd.id}`
//         );
//         setUser(response.data.data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setUser([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchScheduled = async () => {
//       await delay(1000);
//       try {
//         const response = await axios.get(
//           // `https://app.yallapadel.club/public/dashboard/getScheduled/${selectedAd.id}`
//           `https://app.yallapadel.club/public/dashboard/getScheduled/${selectedAd.id}`
//         );
//         setScheduled(response.data);
//       } catch (error) {
//         console.error("Error fetching scheduled data:", error);
//         setScheduled([]);
//       }
//     };
//     fetchScheduled();
//   }, []);

//   const handleAccordClick = (panelId, day, month) => {
//     setTimesLoading(true);
//     setExpanded((prev) => (prev === panelId ? false : panelId));
//     fetchTimes(day, month);
//   };

//   const fetchTimes = async (day, month) => {
//     try {
//       const response = await axios.get(
//         `https://app.yallapadel.club/public/dashboard/getTime`,
//         {
//           params: {
//             play_ground_id: selectedAd.id,
//             month,
//             day,
//           },
//         }
//       );
//       setTimes(response.data.data);
//       // console.log(response.data.data);
//     } catch (error) {
//       console.error("Error fetching times:", error);
//       setTimes([]);
//     } finally {
//       setTimesLoading(false);
//     }
//   };

//   return (
//     <div className="item-details flex-col">
//       {loading ? (
//         <div>
//           <CircularProgress />
//         </div>
//       ) : (
//         <ImagesSlider images={user?.images || []} />
//       )}

//       <div className="content flex-col">
//         {!loading && (
//           <>
//             <ItemPage />
//             <div className="details">
//               <DetailsCard
//                 first={user?.title || "No title"}
//                 last="playground"
//                 // third={` / ${user?.playground?.num_of_playground || "0"}`}
//                 icon={<PiCourtBasketballFill className="moon" />}
//               />
//               <DetailsCard
//                 first={user?.city?.path || "Unknown location"}
//                 last="location"
//                 third=""
//                 icon={<FaMapLocationDot className="moon" />}
//               />
//               <DetailsCard
//                 first={user?.price || "0"}
//                 last="price"
//                 third=" SAR"
//                 icon={<FaSackDollar className="moon" />}
//               />
//               <DetailsCard
//                 first={user?.description || "N/A"}
//                 last="description"
//                 third={`/ ${user?.item_type || ""}`}
//                 icon={<IoDocumentSharp className="moon" />}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="according flex-col">
//         {!loading & (scheduled.length > 0) ? (
//           scheduled.map((item, index) => {
//             const panelId = `panel${index}`;
//             return (
//               <Accordion
//                 key={index}
//                 expanded={expanded === panelId}
//                 onChange={() =>
//                   handleAccordClick(panelId, item.day, item.month)
//                 }
//                 sx={{
//                   backgroundColor: "#272d35",
//                   color: "#fff",
//                   width: "97%",
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1-content"
//                   id={`panel${index}-header`}
//                   className="flex-row acc-head"
//                 >
//                   <div className="flex-row acc-date">
//                     <p>{`${item.day} / `}</p>
//                     <p>{`${item.month} / `}</p>
//                     <p>{`${item.year}`}</p>
//                   </div>
//                   <div className="flex-row acc-hours">
//                     <h4 style={{ color: "#3C97F3" }}>{item.totalHours}</h4>
//                     <p>H</p>
//                     <FaClock className="icon" />
//                   </div>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   {timesLoading ? (
//                     <div>Loading times...</div>
//                   ) : times ? (
//                     times.map((time, idx) =>
//                       time.schedules.map((schedule, scheduleIdx) => (
//                         <Button
//                           key={`${idx}-${scheduleIdx}`} // Ensure unique key
//                           variant="contained"
//                           className={`time-btn ${
//                             schedule.status === "booked" ? "booked" : ""
//                           }`}
//                           sx={{ margin: "5px", backgroundColor: "#3C97F3" }}
//                         >
//                           {schedule.time}
//                         </Button>
//                       ))
//                     )
//                   ) : (
//                     <h2> no Schedules dates found </h2>
//                   )}
//                 </AccordionDetails>
//               </Accordion>
//             );
//           })
//         ) : (
//           <Failed text="No Scheduled Found" />
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import "./ItemDetailsPage.css";
import waiting from "../../../assets/imgs/Waiting-amico.svg";
import { MyContext } from "../../ContextApi/Provider";
import { FaMapLocationDot } from "react-icons/fa6";
import DetailsCard from "../../items/DetailsCard/DetailsCard";
import { PiCourtBasketballFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import ImagesSlider from "../../items/ImagesSlider/ImagesSlider";

// MUI Imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import ItemPage from "../ItemPage/ItemPage";
import Failed from "../../items/Failed/Failed";
import { CircularProgress } from "@mui/material";

export default function ItemDetailsPage() {
  const { selectedAd } = useContext(MyContext);
  const [expanded, setExpanded] = useState(false);
  const [timesLoading, setTimesLoading] = useState(false);

  // Static data to replace API calls
  const staticUser = {
    title: "Basketball Arena",
    city: { path: "Riyadh, Saudi Arabia" },
    price: 100,
    description: "State-of-the-art basketball court with full facilities.",
    item_type: "Indoor",
    images: ["/images/arena1.jpg", "/images/arena2.jpg", "/images/arena3.jpg"],
  };

  const staticScheduled = [
    { day: 25, month: 1, year: 2025, totalHours: 8 },
    { day: 26, month: 1, year: 2025, totalHours: 6 },
  ];

  const staticTimes = [
    {
      schedules: [
        { time: "08:00 AM", status: "available" },
        { time: "09:00 AM", status: "booked" },
      ],
    },
    {
      schedules: [
        { time: "10:00 AM", status: "available" },
        { time: "11:00 AM", status: "booked" },
      ],
    },
  ];

  const handleAccordClick = (panelId) => {
    setTimesLoading(true);
    setExpanded((prev) => (prev === panelId ? false : panelId));
    // Simulate fetching times delay
    setTimeout(() => {
      setTimesLoading(false);
    }, 500);
  };

  return (
    <div className="item-details flex-col">
      {/* Image Slider */}
      <ImagesSlider images={staticUser?.images || []} />

      {/* Content Section */}
      <div className="content flex-col">
        <ItemPage />
        <div className="details">
          <DetailsCard
            first={staticUser?.title || "No title"}
            last="playground"
            icon={<PiCourtBasketballFill className="moon" />}
          />
          <DetailsCard
            first={staticUser?.city?.path || "Unknown location"}
            last="location"
            icon={<FaMapLocationDot className="moon" />}
          />
          <DetailsCard
            first={staticUser?.price || "0"}
            last="price"
            third=" SAR"
            icon={<FaSackDollar className="moon" />}
          />
          <DetailsCard
            first={staticUser?.description || "N/A"}
            last="description"
            third={`/ ${staticUser?.item_type || ""}`}
            icon={<IoDocumentSharp className="moon" />}
          />
        </div>
      </div>

      {/* Accordion Section */}
      <div className="according flex-col">
        {staticScheduled.length > 0 ? (
          staticScheduled.map((item, index) => {
            const panelId = `panel${index}`;
            return (
              <Accordion
                key={index}
                expanded={expanded === panelId}
                onChange={() => handleAccordClick(panelId)}
                sx={{
                  backgroundColor: "#272d35",
                  color: "#fff",
                  width: "97%",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id={`panel${index}-header`}
                  className="flex-row acc-head"
                >
                  <div className="flex-row acc-date">
                    <p>{`${item.day} / `}</p>
                    <p>{`${item.month} / `}</p>
                    <p>{`${item.year}`}</p>
                  </div>
                  <div className="flex-row acc-hours">
                    <h4 style={{ color: "#3C97F3" }}>{item.totalHours}</h4>
                    <p>H</p>
                    <FaClock className="icon" />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {timesLoading ? (
                    <div>Loading times...</div>
                  ) : (
                    staticTimes.map((time, idx) =>
                      time.schedules.map((schedule, scheduleIdx) => (
                        <Button
                          key={`${idx}-${scheduleIdx}`} // Ensure unique key
                          variant="contained"
                          className={`time-btn ${
                            schedule.status === "booked" ? "booked" : ""
                          }`}
                          sx={{ margin: "5px", backgroundColor: "#3C97F3" }}
                        >
                          {schedule.time}
                        </Button>
                      ))
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Failed text="No Scheduled Found" />
        )}
      </div>
    </div>
  );
}
