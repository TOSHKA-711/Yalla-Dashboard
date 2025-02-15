import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Withdraws.css";
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

function WithDrawModal({
  sortOpen,
  handleSortClose,
  sortValue,
  handleSortChange,
  handleUserNavigation,
  handleVendorNavigation,
  user,
}) {
  // console.log(user);
  return (
    <Dialog
      open={sortOpen}
      keepMounted
      onClose={handleSortClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "withdraw-dialog-paper" }} // Custom CSS class for dialog
    >
      {/* <DialogTitle className="dialog-title">{"Sort By"}</DialogTitle> */}
      <DialogContent className="dialog-content flex-row">
        <div className=" flex-row details">
          <div
            className="child flex-col"
            onClick={() => handleVendorNavigation(user.user)}
          >
            <h2>Vendor</h2>
            <div className="user-card  pay-card  flex-col flex-1">
              <div className="user-name flex-col">
                {/* <img
                  src={user.user ? user.user.image : ""}
                  className="img"
                  style={{ width:"15rem",height:"8rem"}}
                /> */}
                <Avatar />

                <span className="divider"></span>
              </div>

              <div className="user-details flex-col">
                <span className=" flex-row">
                  <CiUser className="icon" />
                  <p>-ID { "20"} </p>
                </span>
                <span className=" flex-row">
                  <MdOutlinePayment className="icon" />
                  <p>{ "260"} $</p>
                </span>
                <span className=" flex-row">
                  <MdOutlineMailOutline className="icon" />
                  <p>{ "aliovich711@gmail.com"}</p>
                </span>
                <span className=" flex-row">
                  <CiPhone className="icon" />
                  <p>{ "01021068752"}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function WithDraw() {
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

  // fetching users

  // useEffect(() => {
  //   const fetchUsers = () => {
  //     axios
  //       .get(
  //         // '/api/public/dashboard/getAgent'
  //         "https://app.yallapadel.club/public/dashboard/getWithDraws"
  //       )
  //       .then((response) => {
  //         if (Array.isArray(response.data.data)) {
  //           setUsers(response.data.data);
  //           setError(false);
  //           // console.log(response.data.data);
  //         } else {
  //           console.error("Expected an array but got:", response.data);
  //           setError(true);
  //           setUsers([]); // Fallback to an empty array
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching users:", error);
  //         setUsers([]); // Handle error state
  //       });
  //   };

  //   fetchUsers();
  // }, []);

  // Static Data
  const staticUsers = [
    {
      id: "1",
      user: {
        id: "U101",
        name: "John Doe",
        phone: "1234567890",
        type: "Player",
      },
      withdrawal_amount: 500,
      currency: "$",
    },
    {
      id: "2",
      user: {
        id: "U102",
        name: "Jane Smith",
        phone: "9876543210",
        type: "Vendor",
      },
      withdrawal_amount: 700,
      currency: "$",
    },
    {
      id: "3",
      user: {
        id: "U103",
        name: "Alice Brown",
        phone: "5678901234",
        type: "Player",
      },
      withdrawal_amount: 400,
      currency: "$",
    },
    // Add more static users as needed
  ];

  // Use static data
  useEffect(() => {
    setUsers(staticUsers);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (user?.user.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user?.user.type || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(user?.user.phone || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(user?.withdrawal_amount || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
    navigate("/userBooking");
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
      <WithDrawModal
        sortOpen={sortOpen}
        handleSortClose={handleSortClose}
        sortValue={sortValue}
        handleSortChange={handleSortChange}
        handleUserNavigation={handlePlayerSelect}
        handleVendorNavigation={handleVendorSelect}
        user={dialogData}
      />

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
                  <button
                    className="filter flex-row"
                    // onClick={() => handleClickFilterOpen()}
                  >
                    <CiFilter className="icon" />
                    <span>Filter</span>
                  </button>
                  <button
                    className="sort flex-row"
                    // onClick={() => handleClickSortOpen()}
                  >
                    <BiSort className="icon" />
                    <span>Sort</span>
                  </button>
                </div>
              </div>
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
                <TableRow>
                  <TableCell align="left" sx={{ color: "#AAADAF" }}>
                    User Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Withdraw-ID
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    User-ID
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Amount
                  </TableCell>

                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Type
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
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      sx={{
                        color: "#fff",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      {/* <span className="toggle-span">User Name</span> */}
                      <>
                        {/* <Avatar src={row.user.image}></Avatar> */}
                        {row.user.name ? row.user.name : "null"}
                      </>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.id}</>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.user.id}</>
                    </TableCell>

                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.user.phone ? row.user.phone : "null"}</>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <div className=" flex-row">
                        {row.withdrawal_amount ? row.withdrawal_amount : "null"}{" "}
                        {row.currency ? row.currency : "$"}
                      </div>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.user.type ? row.user.type : "null"}</>
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
    </>
  );
}
