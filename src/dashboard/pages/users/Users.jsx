import React, { useState , useEffect, useContext } from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Numbers from "../../components/numbers/Numbers";
import "../../items/ModalOne.css";
import "./Users.css";
import UsersTable from "../../items/UsersTable/UsersTable";
import { MyContext } from "../../ContextApi/Provider";

function SortModal({ sortOpen, handleSortClose , sortValue ,handleSortChange  }) {
  return (
    <Dialog
      open={sortOpen}
      keepMounted
      onClose={handleSortClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "dialog-paper" }} // Custom CSS class for dialog
    >
      <DialogTitle className="dialog-title">
        {"Sort By"}
      </DialogTitle>
      <DialogContent className="dialog-content flex-row">
  
      <FormControl sx={{width:"100%"}}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={sortValue}
        onChange={handleSortChange}
        className="radio-group flex-row"
      >
        <FormControlLabel  labelPlacement="start" className="child flex-row" value="most paid" control={<Radio sx={{color:"#fff"}}/>} label="most paid"/>
        <FormControlLabel  labelPlacement="start" className="child flex-row" value="Recently added" control={<Radio sx={{color:"#fff"}}/>} label="Recently added" />
        <FormControlLabel  labelPlacement="start" className="child flex-row" value="least paid" control={<Radio sx={{color:"#fff"}}/>} label="least paid" />
        <FormControlLabel  labelPlacement="start" className="child flex-row" value="Old added" control={<Radio sx={{color:"#fff"}}/>} label="Old added" />
        <FormControlLabel  labelPlacement="start" className="child flex-row" value="most advertised" control={<Radio sx={{color:"#fff"}}/>} label="most advertised" />
      </RadioGroup>
    </FormControl>
    
      </DialogContent>
      <DialogActions className="dialog-actions flex-row">
        <Button onClick={handleSortClose}>Apply</Button>
        
      </DialogActions>
    </Dialog>
  );
}
function valuetext(value) {
  return `${value} USD`; // Change "USD" to your desired currency or unit
}

function FilterModal({ filterOpen, handleFilterClose, filterValue, handleFilterChange }) {
  const [rangeValue, setRangeValue] = React.useState([500, 30000]); // Adjust the default range here
  const [filterCountry, setFilterCountry] = React.useState('');

  const handleFilterCountryChange = (event) => {
    setFilterCountry(event.target.value);
  };

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  return (
    <Dialog
      open={filterOpen}
      keepMounted
      onClose={handleFilterClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "dialog-paper filter-paper" }} // Custom CSS class for dialog
    >
      <DialogTitle className="dialog-title">
        {"Filter By"}
      </DialogTitle>
      <DialogContent className="dialog-content flex-row">
        <div className="filter-content flex-col">
          <div className="range child flex-row">
            <p>Price range</p>
            <Box sx={{ width: 300 }}>
              <Slider
                min={500} 
                max={30000} 
                step={500}
                value={rangeValue}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
          </div>
          <div className="select child flex-row">
            <p>Country</p>
            <FormControl sx={{ width: 300, border:"1px solid #747474" , borderRadius:"10px" }}>
              <Select
                value={filterCountry}
                onChange={handleFilterCountryChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{borderRadius:"10px" , }}
              >
                <MenuItem value="">
                  <em>Egypt</em>
                </MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="dialog-actions flex-row">
        <Button onClick={handleFilterClose}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Users() {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortValue, setSortValue] = React.useState('most paid');
  const [filterValue, setFilterValue] = React.useState('most paid');
  const {selectedUsers, setSelectedUsers} = useContext(MyContext);

  const handleClickSortOpen = () => {
    setSortOpen(true);
  };

  const handleSortClose = () => {
    setSortOpen(false);
  };

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };
  const handleClickFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      <SortModal sortOpen={sortOpen} handleSortClose={handleSortClose} sortValue={sortValue} handleSortChange={handleSortChange}/>
      <FilterModal filterOpen={filterOpen} handleFilterClose={handleFilterClose} filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <div className="users flex-col">
        {/* <Numbers /> */}
        <UsersTable handleClickSortOpen={handleClickSortOpen} handleClickFilterOpen={handleClickFilterOpen}/>
      </div>
    </>
  );
}
