import React, { useContext, useEffect, useMemo, useState } from "react";
import "./TransTable.css";
import "./PaymentDialog.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Avatar, useMediaQuery } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { MyContext } from "../../ContextApi/Provider";
import axios from "axios";
import { MdOutlinePayment } from "react-icons/md";
import Failed from "../Failed/Failed";

function PaymentModal({
  sortOpen,
  handleSortClose,
  sortValue,
  handleSortChange,
  handleUserNavigation,
  handleVendorNavigation,
  user,
}) {
  
  return (
    <Dialog
      open={sortOpen}
      keepMounted
      onClose={handleSortClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "payment-dialog-paper" }} // Custom CSS class for dialog
    >
      {/* <DialogTitle className="dialog-title">{"Sort By"}</DialogTitle> */}
      <DialogContent className="dialog-content flex-row">
        <div className=" flex-row details">
          <div
            className="child flex-col"
            
          >
            <h2>User</h2>
            <div className="user-card  pay-card  flex-col flex-1">
              <div className="user-name flex-col">
                <Avatar
                  src={user.user ? user.user.image : ""}
                  className="img"
                  style={{ border: "2px solid #3C97F3" }}
                />

                <h2></h2>
                <span className="divider"></span>
              </div>

              <div className="user-details flex-col">
                <span className=" flex-row">
                  <CiUser className="icon" />
                  <p>-ID {user.user ? user.user.id : "null"} </p>
                </span>
                <span className=" flex-row">
                  <MdOutlinePayment className="icon" />
                  <p>{user.user ? user.user.wallet : "null"} $</p>
                </span>
                <span className=" flex-row">
                  <MdOutlineMailOutline className="icon" />
                  <p>{user.user ? user.user.email : "null"}</p>
                </span>
                <span className=" flex-row">
                  <CiPhone className="icon" />
                  <p>{user.user ? user.user.phone : "null"}</p>
                </span>
              </div>
            </div>
          </div>
          <div
            className="child flex-col"
          
          >
            <h2>Vendor</h2>
            <div className="user-card pay-card flex-col flex-1">
              <div className="user-name flex-col">
                <Avatar
                  src={user.owner ? user.owner.image : ""}
                  className="img"
                  style={{ border: "2px solid #3C97F3" }}
                />

                <h2></h2>
                <span className="divider"></span>
              </div>

              <div className="user-details flex-col">
                <span className=" flex-row">
                  <CiUser className="icon" />
                  <p>-ID {user.owner ? user.owner.id : "null"} </p>
                </span>
                <span className=" flex-row">
                  <MdOutlinePayment className="icon" />
                  <p>{user.owner ? user.owner.wallet : "null"} $</p>
                </span>
                <span className=" flex-row">
                  <MdOutlineMailOutline className="icon" />
                  <p>{user.owner ? user.owner.email : "null"}</p>
                </span>
                <span className=" flex-row">
                  <CiPhone className="icon" />
                  <p>{user.owner ? user.owner.phone : "null"}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TransTable({ url , title}) {
  const navigate = useNavigate();

  const [sortValue, setSortValue] = useState("most paid");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [dialogData, setDialogData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:930px)");

  const {
    selectedUsers,
    setSelectedUsers,
    setSelectedPlayer,
    // DialogPaymentData,
    // setDialogPaymentData,
  } = useContext(MyContext);

  // Static Mock Data
const mockData = [
  { id: "P001", user_id: "U123", owner_id: "O456", phone: "+1234567890", total: 100, currency: "$", type: "Credit" },
  { id: "P002", user_id: "U124", owner_id: "O457", phone: "+1234567891", total: 200, currency: "$", type: "Debit" },
  { id: "P003", user_id: "U125", owner_id: "O458", phone: "+1234567892", total: 150, currency: "€", type: "Credit" },
  { id: "P004", user_id: "U126", owner_id: "O459", phone: "+1234567893", total: 250, currency: "£", type: "Debit" },
];

  // fetching users

  useEffect(() => {
    const fetchUsers = () => {
    setUsers(mockData)
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.type).toLowerCase().includes(searchTerm.toLowerCase())||
      String(user.id).toLowerCase().includes(searchTerm.toLowerCase())||
      String(user.phone).toLowerCase().includes(searchTerm.toLowerCase())||
      String(user.total).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const visibleRows = useMemo(
    () =>
      filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredUsers]
  );

  //  user navigate func
  const handlePlayerSelect = (e) => {
    setSelectedPlayer(e);
    window.location.href = "/userBooking";
    // navigate("/userBooking");
   
  };
  //  vendor navigate func
  const handleVendorSelect = (e) => {
    setSelectedPlayer(null);
    setSelectedUsers(e);
    navigate("/vendorItems");
  };

  // handle dialog data
  const handleRowClick = (data) => {
    setDialogData(data);
    setSortOpen(true);
    // console.log(data);
  };
  const handleSortClose = () => {
    setSortOpen(false);
  };
  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <>
      <PaymentModal
        sortOpen={sortOpen}
        handleSortClose={handleSortClose}
        sortValue={sortValue}
        handleSortChange={handleSortChange}
        handleUserNavigation={handlePlayerSelect}
        handleVendorNavigation={handleVendorSelect}
        user={dialogData}
      />

    {
      users.length >0 ?   
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            backgroundColor: "#272D35",
            color: "#fff",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              <div className="table-header flex-row">
                <div className="search flex-row">
                  <CiSearch className="icon" />
                  <input
                    placeholder="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="btns flex-row">
                <h2>{title}</h2>
                </div>
              </div>
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>Payment-ID</TableCell>
                  <TableCell align="center"  sx={{ color: "#AAADAF" }}>User-ID</TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>Owner-ID</TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    total
                  </TableCell>

                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.id}</>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center" sx={{ color: "#fff" }}
                    >
                    
                        {row.user_id ? row.user_id : "null"}
                    
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center" sx={{ color: "#fff" }}
                    >
                    
                        {row.owner_id ? row.owner_id : "null"}
                    
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.phone ? row.phone : "null"}</>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <div className=" flex-row">
                        {row.total ? row.total : "null"}{" "}
                        {row.currency ? row.currency : "$"}
                      </div>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.type}</>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            className="table-pag"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              color: "#fff",
              // overflowX: "hidden",
              "& .MuiSelect-icon": { color: "#fff" },
              "& .MuiTablePagination-actions button": { color: "#fff" },
              "@media (max-width: 550px)": {
                display: "flex",
                flexDirection: "column",
              },
            }}
          />
        </Paper>
      </Box> 
      : <h2>No Transactions</h2>
    }

   
    </>
  );
}
