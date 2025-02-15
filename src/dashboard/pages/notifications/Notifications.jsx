import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./Notifications.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function Notifications() {
  const [time, setTime] = useState("Only Users");
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  return (
    <div className="notifications flex-col">
      <h2>Notifications</h2>
      <div className="container flex-row">
        <div className="text flex-col flex-3">
          <div className="content flex-col">
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
            <div className="child transition flex-row">
              <Avatar
                className="avatar"
                src="https://via.placeholder.com/150"
              />
              <span className=" flex-col">
                <p>There's an incoming message from Richard Mandowen</p>
                <h6>2 hours Ago</h6>
              </span>
            </div>
          </div>
        </div>
        <div className="form flex-2 flex-col">
          <h2 className="child">Send Notification</h2>
          <div className="child">
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
                    border: "1px solid #747474",
                    borderRadius: "10px",
                    color:"#fff"
                  }}
                >
                  <MenuItem value="Only Users">
                    <em>Only Users</em>
                  </MenuItem>
                  <MenuItem value={10}>Users</MenuItem>
                  <MenuItem value={20}>Merchents</MenuItem>
                  <MenuItem value={30}>Cars Show</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <p>Send To</p>
          </div>
          <div className="child with-label">
            <input className="first"></input>
            <p>Id User</p>
          </div>
          <div className="child with-label">
            <textarea className="second"></textarea>
            <p> Title</p>
          </div>
          <div className="child with-label">
            <textarea className="second"></textarea>
            <p>Sub Title</p>
          </div>
          <div className="child button">
         <buttom>Send</buttom>
          </div>
        </div>
      </div>
    </div>
  );
}
