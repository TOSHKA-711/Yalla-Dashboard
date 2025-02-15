import React, { useContext, useEffect, useState } from "react";
import "./ItemDetailsPage.css";
import waiting from "../../../assets/imgs/Waiting-amico.svg";
import { MyContext } from "../../ContextApi/Provider";
import { FaMapLocationDot } from "react-icons/fa6";
import DetailsCard from "../../items/DetailsCard/DetailsCard";
import { PiCourtBasketballFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
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
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState({});
  const [scheduled, setScheduled] = useState([]);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timesLoading, setTimesLoading] = useState(false);

  const staticUser = {
    title: "Basketball Arena",
    city: { path: "Riyadh, Saudi Arabia" },
    price: 100,
    description: "State-of-the-art basketball court with full facilities.",
    item_type: "Indoor",
    images: ["https://www.polytan.com/wp-content/uploads/2022/11/dsc_3495-lowres.jpg", "https://th.bing.com/th/id/OIP.YyjOsDgAVnXFwbp0ouPP3QHaE8?pid=ImgDet&w=474&h=316&rs=1", "https://adcountryclub.com/media/14ed51br/adcc-padel-gallery-5.jpg?anchor=center&mode=crop&width=1200&height=800"],
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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchUser = async () => {
      await delay(1000);
      setUser(staticUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchScheduled = async () => {
      await delay(1000);
      setScheduled(staticScheduled);
    };
    fetchScheduled();
  }, []);

  const handleAccordClick = async (panelId, day, month) => {
    setTimesLoading(true);
    setExpanded((prev) => (prev === panelId ? false : panelId));
    await fetchTimes(day, month);
  };

  const fetchTimes = async (day, month) => {
    await delay(500);
    setTimes(staticTimes);
    setTimesLoading(false);
  };

  return (
    <div className="item-details flex-col">
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <ImagesSlider images={user?.images || []} />
      )}

      <div className="content flex-col">
        {!loading && (
          <>
            {/* <ItemPage /> */}
            <div className="details">
              <DetailsCard
                first={user?.title || "No title"}
                last="playground"
                icon={<PiCourtBasketballFill className="moon" />}
              />
              <DetailsCard
                first={user?.city?.path || "Unknown location"}
                last="location"
                icon={<FaMapLocationDot className="moon" />}
              />
              <DetailsCard
                first={user?.price || "0"}
                last="price"
                third=" SAR"
                icon={<FaSackDollar className="moon" />}
              />
              <DetailsCard
                first={user?.description || "N/A"}
                last="description"
                third={`/ ${user?.item_type || ""}`}
                icon={<IoDocumentSharp className="moon" />}
              />
            </div>
          </>
        )}
      </div>

      <div className="according flex-col">
        {!loading && scheduled.length > 0 ? (
          scheduled.map((item, index) => {
            const panelId = `panel${index}`;
            return (
              <Accordion
                key={index}
                expanded={expanded === panelId}
                onChange={() => handleAccordClick(panelId, item.day, item.month)}
                sx={{
                  backgroundColor: "#272d35",
                  color: "#fff",
                  width: "97%",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel-content"
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
                  ) : times.length > 0 ? (
                    times.map((time, idx) =>
                      time.schedules.map((schedule, scheduleIdx) => (
                        <Button
                          key={`${idx}-${scheduleIdx}`}
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
                  ) : (
                    <h2>No Schedule Dates Found</h2>
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
