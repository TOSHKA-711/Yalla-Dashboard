import React, { useEffect, useState } from "react";
import { Avatar, CircularProgress, DialogTitle } from "@mui/material";
import "./VendorItems.css";

import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { MyContext } from "../../ContextApi/Provider";
import { useContext } from "react";
import UserBookingCard from "../../items/UserBookingCard/UserBookingCard";
import axios from "axios";
import AdsCard from "../../items/AdsCard/AdsCard";
import TransTable from "../../items/TransTable/TransTable";
import Numbers from "../../components/numbers/Numbers";
import VendorNumbers from "../../components/vendorNumbers/VendorNumbers";
import VendorWithdrawTable from "../../items/VendorWithdrawTable/VendorWithdrawTable";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





function PaymentModal({ sortOpen, handleSortClose }) {
  const { selectedUsers} = useContext(MyContext);
  const [image, setImage] = useState(null);
  const [withDrawPayload, setWithDrawPayload] = useState({
    image: null,
    remarks: "",
    vendor_id: selectedUsers.id,
    withdrawal_amount: "",
  });
  const [loading, setLoading] = useState(false);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithDrawPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setWithDrawPayload((prev) => ({ ...prev, image: file }));
    }
    event.target.value = ""; // Reset the input value
  };

  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (!withDrawPayload.vendor_id || !withDrawPayload.withdrawal_amount || !withDrawPayload.image) {
      console.error("Please fill in all required fields.");
      errorNotify(); // Show error notification
      return;
    }

    setLoading(true); // Set loading state
    const formData = new FormData();
    formData.append("image", withDrawPayload.image);
    formData.append("remarks", withDrawPayload.remarks);
    formData.append("vendor_id", selectedUsers.id);
    formData.append("withdrawal_amount", withDrawPayload.withdrawal_amount);

    const url = "https://app.yallapadel.club/public/dashboard/withdrawWalletVendor";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      window.alert(response.data.message)

    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message);
      window.alert("There was an error!", error.response?.data || error.message)
  
    } finally {
      setLoading(false); // Reset loading state
      handleSortClose(); // Close modal
    }
  };

  return (
    <Dialog
      open={sortOpen}
      keepMounted
      onClose={handleSortClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "withdraw-dialog-paper" }} // Custom CSS class for dialog
    >
      <DialogTitle className="dialog-title">{"Withdraw"}</DialogTitle>
      <DialogContent className="dialog-content flex-row">
        <div className="form flex-col">
          <div className="child with-label">
            <input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="image"
            />
            <button
              className="child upload flex-row button"
              onClick={handleUploadClick}
              disabled={loading} // Disable button while loading
            >
              <FaCloudUploadAlt className="icon" />
              ADD FILE
            </button>
            {image && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    height: "60px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
          {/* <div className="child with-label">
            <input
              className="first"
              type="number"
              name="vendor_id"
              value={withDrawPayload.vendor_id}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />
            <p>Vendor ID</p>
          </div> */}
          <div className="child with-label">
            <input
              className="first"
              type="number"
              name="withdrawal_amount"
              value={withDrawPayload.withdrawal_amount}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />
            <p>Amount</p>
          </div>
          <div className="child with-label">
            <textarea
              className="second"
              name="remarks"
              value={withDrawPayload.remarks}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            ></textarea>
            <p>Remarks</p>
          </div>
          <div className="child button" onClick={handleSubmitUpload} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </div>
        
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function VendorItems() {
  const { selectedUsers, selectedPlayer } = useContext(MyContext);
  const [user, setUser] = useState({});
  const [sortOpen, setSortOpen] = useState(false);
  const [numbers, setNumbers] = useState({});

  const [loading, setLoading] = useState(false);

  // Function to simulate a delay
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/getAgentById/${selectedUsers.id}`
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
  //   fetchUser();
  // }, []);

  // const fetchNumbers = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/getVendorStatusWalletById/${selectedUsers.id}`
  //     );

  //     setNumbers(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     setNumbers([]); // Handle error
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchNumbers();
  // }, []);

  // // handle user Status

  // const freezeUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://app.yallapadel.club/public/dashboard/changeUserStatus/${selectedUsers.id}/0`
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
  //       `https://app.yallapadel.club/public/dashboard/changeUserStatus/${selectedUsers.id}/1`
  //     );

  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.error("Error freezing user:", error);
  //   }
  //   fetchUser();
  // };

  // handle modal
  const handleSortClose = () => {
    setSortOpen(false);
  };
  const handleSortOpen = () => {
    setSortOpen(true);
  };

  // Render loading state or the actual content
  if (loading) {
    return (
      <h3>
        <CircularProgress />
      </h3>
    ); // You can also use a spinner component here
  }

  return (
    <div className="vendor-items flex-row">
      <div className="user-data flex-col flex-5">
        <PaymentModal sortOpen={sortOpen} handleSortClose={handleSortClose} />
        <VendorNumbers
          oneN={numbers.wallet_balance}
          oneC={"wallet balance"}
          twoN={numbers.all_earn_balance}
          twoC={"Total Earnings Balance"}
          threeN={numbers.pending_balance}
          threeC={"pending balance"}
        />
        <AdsCard className="userBooking" />
        <TransTable
          url={``}
          title="Transactions"
        />
       
        <VendorWithdrawTable
          url={``}
          title="Withdraws"
        />
     
      </div>
      <div className="user-card flex-col flex-2">
        <div className="user-name flex-col">
          <Avatar src={user.image} className="img" />
          <h2>{user.name ? user.name : "null"}</h2>
          <span className="divider"></span>
        </div>
        <div className="down flex-col">
          <div className="user-details flex-col">
            <span className=" flex-row">
              <CiUser className="icon" />
              <p>-ID {selectedUsers.id ? selectedUsers.id : selectedPlayer} </p>
            </span>
            <span className=" flex-row">
              <MdOutlineMailOutline className="icon" />
              <p>{user.email ? user.email : "null"}</p>
            </span>
            <span className=" flex-row">
              <CiPhone className="icon" />
              <p>{user.phone ? user.name : "null"}</p>
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
              <button className="active flex-row" onClick={() => activeUser()}>
                <RiDeleteBin6Line className="icon" />
                <span>Active Account</span>
              </button>
            ) : (
              <button className="freeze flex-row" onClick={() => freezeUser()}>
                <MdBlock className="icon" />
                <span>freeze Account</span>
              </button>
            )}
            <button
              className="withdraw flex-row"
              onClick={() => handleSortOpen()}
            >
              <BiMoneyWithdraw className="icon" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
