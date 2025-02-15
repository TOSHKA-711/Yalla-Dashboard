import React, { useState ,useEffect } from "react";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function NavBar() {
  // handle time sort
  const [time, setTime] = useState("All Time");
  const [toggleNavBar, setToggleNavBar] = useState(false);

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  // handle time sort
  // handle toggle navbar
  const handleToggleNavBar = () => {
    setToggleNavBar(!toggleNavBar);
  }

  
  return (
    <>
      <div className="navbar big flex-row">
        <div className="container flex-row">
          <div className="search flex-row flex-6">
            <CiSearch className="icon" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="messages-icon transition flex-row flex-1">
            <Badge
              badgeContent={4}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#3C97F3",
                  color: "#fff",
                },
              }}
            >
              <MailIcon sx={{ color: "#fff" }} />{" "}
            </Badge>
          </div>
          <Link
            to="/notifications"
            className="notifications-icon transition flex-row flex-1"
          >
            <Badge
              badgeContent={4}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#3C97F3",
                  color: "#fff",
                },
              }}
            >
              <NotificationsIcon color="#fff" style={{color:"#fff"}}/>
            </Badge>
          </Link>
          <div className="sort flex-row flex-1">
            <Box
              sx={{
                minWidth: 120,
                
              }}
            >
              <FormControl fullWidth >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  onChange={handleChangeTime}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "#272d35",
                    color: "#fff",
                    border:"none",
                    outline:"none",
                    borderRadius:"10px",
                    "&:hover": {
                      // backgroundColor: "lightblue",
                      border:"none",
                    outline:"none",
                    },
                  }}
                >
                  <MenuItem  value="All Time">
                    <em>All Time</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="nav-user flex-row flex-2">
            <Avatar className="avatar" src="https://via.placeholder.com/150" />
            user
          </div>
        </div>
      </div>
      {/* ----------- */}
      <div className="navbar small flex-row">
        <div className="container flex-col">
          <div className="top flex-row">
            <div className=" flex-row toggle-icon" onClick={()=>handleToggleNavBar()}>
              <HiMiniBars3CenterLeft className="icon" />
            </div>

            <div className=" flex-row icons">
              <div className="messages-icon transition flex-row flex-1">
                <Badge
                  badgeContent={4}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#3C97F3",
                      color: "#fff",
                    },
                  }}
                >
                  <MailIcon sx={{ color: "#fff" }} />{" "}
                </Badge>
              </div>
              <Link
                to="/notifications"
                className="notifications-icon transition flex-row flex-1"
              >
                <Badge
                  badgeContent={4}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#3C97F3",
                      color: "#fff",
                    },
                  }}
                >
                  <NotificationsIcon color="#fff" style={{color:"#fff"}} />
                </Badge>
              </Link>

              <div className="nav-user flex-row flex-2">
                <Avatar
                  className="avatar"
                  src="https://via.placeholder.com/150"
                />
                user
              </div>
            </div>
          </div>
          <div className="down flex-row">
            <div className="search flex-row flex-6">
              <CiSearch className="icon" />
              <input type="text" placeholder="Search" />
            </div>
            <div className="sort flex-row flex-1">
              <Box
                sx={{
                  minWidth: 120,
                }}
              >
                   <FormControl fullWidth >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  onChange={handleChangeTime}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "#272d35",
                    color: "#fff",
                    border:"none",
                    outline:"none",
                    borderRadius:"10px",
                    "&:hover": {
                      // backgroundColor: "lightblue",
                      border:"none",
                    outline:"none",
                    },
                  }}
                >
                  <MenuItem  value="All Time">
                    <em>All Time</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className={`toggle-nav transition flex-col ${toggleNavBar&&"active"}`}>
      <div className="nav-user flex-row flex-2">
                <Avatar
                  className="avatar"
                  src="https://via.placeholder.com/150"
                />
                user
              </div>
        <div className="down flex-row">
          <div className="search flex-row flex-6">
            <CiSearch className="icon" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="sort flex-row flex-1">
            <Box
              sx={{
                minWidth: 120,
              }}
            >
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  onChange={handleChangeTime}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "lightblue",
                    },
                  }}
                >
                  <MenuItem value="All Time">
                    <em>All Time</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <IoMdClose className="toggle-nav-icon" onClick={()=>handleToggleNavBar()}/>
      </div>
    </>
  );
}
