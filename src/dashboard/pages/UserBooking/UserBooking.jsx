import React, { useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import "./UserBooking.css";

import { CiUser } from "react-icons/ci";

import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { MyContext } from "../../ContextApi/Provider";
import { useContext } from "react";
import UserBookingCard from "../../items/UserBookingCard/UserBookingCard";
import TransTable from "../../items/TransTable/TransTable";


export default function UserBooking() {
  const { selectedUsers, selectedPlayer } = useContext(MyContext);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);

  // Function to simulate a delay
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/getUserById/${
  //         selectedPlayer || selectedUsers.id
  //       }`
      
  //     );

  //     setUser(response.data.data);
  //     // console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     setUser([]); // Handle error
  //   } finally {
  //     setLoading(false); // Set loading to false after fetching
  //   }
  // };

  // useEffect(() => {

  //   setUser(selectedUsers)
    
  // }, []);

  // handle user Status

  // const freezeUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/changeUserStatus/${
  //         selectedPlayer || selectedUsers.id
  //       }/0`
  //     );

  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.error("Error freezing user:", error);
  //   }
  //   fetchUser();
  // };
  // const activeUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/changeUserStatus/${
  //         selectedPlayer || selectedUsers.id
  //       }/1`
  //     );

  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.error("Error freezing user:", error);
  //   }
  //   fetchUser();
  // };

  // Render loading state or the actual content
  if (loading) {
    return <h1><CircularProgress/></h1>; // You can also use a spinner component here
  }

  return (
    <div className="bookings flex-row">
      <div className="user-data flex-col flex-4">
        <UserBookingCard className="userBooking" />
        <TransTable url={`https://app.yallapadel.club/public/dashboard/getUserWalletTransactions/${selectedPlayer || selectedUsers.id}`} title="Transactions"/>
        

      </div>
      <div className="user-card flex-col flex-1">
        <div className="user-name flex-col">
          <Avatar src={selectedUsers.image} className="img" />
          <h2>{selectedUsers.name ? selectedUsers.name : "null"}</h2>
          <span className="divider"></span>
        </div>
        <div className="down flex-col">
          <div className="user-details flex-col">
            <span className=" flex-row">
              <CiUser className="icon" />
              <p>-ID {selectedPlayer ? selectedPlayer :  selectedUsers.id } </p>
            </span>
            <span className=" flex-row">
              <MdOutlineMailOutline className="icon" />
              <p>{selectedUsers.email ? selectedUsers.email : "aliovich711@gmail.com"}</p>
            </span>
            <span className=" flex-row">
              <CiPhone className="icon" />
              <p>{selectedUsers.phone ? selectedUsers.phone : "+201021068752"}</p>
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
            {user.status === 0 ? (
              <button className="active flex-row" onClick={()=>console.log("actived")}>
                <RiDeleteBin6Line className="icon" />
                <span>Active Account</span>
              </button>
            ) : (
              <button className="freeze flex-row" onClick={()=>console.log("freezed")}>
                <MdBlock className="icon" />
                <span>freeze Account</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
