import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./VendorItems.css";

import { CiUser } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { TiClipboard } from "react-icons/ti";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { MyContext } from "../../ContextApi/Provider";
import { useContext } from "react";
import UserBookingCard from "../../items/UserBookingCard/UserBookingCard";
import axios from "axios";
import AdsCard from "../../items/AdsCard/AdsCard";

export default function VendorItems() {
  const [books, setBooks] = useState([]);
  const { selectedUsers, selectedPlayer } = useContext(MyContext);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  // Function to simulate a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // await delay(2000); 
        const response = await axios.get(
          `/api/public/dashboard/getAgentById/${selectedUsers.id}`
          // `/api/public/dashboard/getAgentById/12`
        
        );

        setUser(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser([]); 
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUser();
  }, []);

  // Render loading state or the actual content
  if (loading) {
    return <h3>Loading...</h3>; // You can also use a spinner component here
  }

  return (
    <div className="vendor-items flex-row">
      <div className="user-data flex-col flex-5">
        <AdsCard className="userBooking" />
      </div>
      <div className="user-card flex-col flex-2">
        <div className="user-name flex-col">
          <Avatar src={user.image} className="img" />
          <h2>{user.name?user.name:"null"}</h2>
          <span className="divider"></span>
        </div>
        <div className="down flex-col">
          <div className="user-details flex-col">
            <span className=" flex-row">
              <CiUser className="icon" />
              <p>-ID  {selectedUsers.id?selectedUsers.id : selectedPlayer } </p>
            </span>
            <span className=" flex-row">
              <MdOutlineMailOutline className="icon" />
              <p>{user.email?user.email:"null"}</p>
            </span>
            <span className=" flex-row">
              <CiPhone className="icon" />
              <p>{user.phone?user.name:"null"}</p>
            </span>
            <span className=" flex-row">
              <CiLock className="icon" />
              <p>**********</p>
            </span>
          </div>

          <div className="user-btns flex-col">
            <button className="del flex-row">
              <RiDeleteBin6Line className="icon" />
              <span>Delete Account</span>
            </button>
            <button className="freeze flex-row">
              <MdBlock className="icon" />
              <span>freeze Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
