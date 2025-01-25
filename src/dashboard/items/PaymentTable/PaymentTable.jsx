import React, { useContext, useEffect, useMemo, useState } from "react";
import "./PaymentTable.css";
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

function PaymentModal({
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
      classes={{ paper: "payment-dialog-paper" }} // Custom CSS class for dialog
    >
      {/* <DialogTitle className="dialog-title">{"Sort By"}</DialogTitle> */}
      <DialogContent className="dialog-content flex-row">
        <div className=" flex-row details">
          <div
            className="child flex-col"
            onClick={() => handleUserNavigation(user.user.id)}
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
                  <p style={{lineBreak: "anywhere"}}>{user.user ? user.user.email : "null"}</p>
                </span>
                <span className=" flex-row">
                  <CiPhone className="icon" />
                  <p>{user.user ? user.user.phone : "null"}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="child flex-col" onClick={()=>handleVendorNavigation(user.owner)}>
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

// export default function PaymentTable() {
//   const navigate = useNavigate();

//   const [sortValue, setSortValue] = useState("most paid");
//   const [sortOpen, setSortOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [dialogData, setDialogData] = useState({});
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [error, setError] = useState(false);
//   const isSmallScreen = useMediaQuery("(max-width:930px)");

//   const {
//     selectedUsers,
//     setSelectedUsers,
//     setSelectedPlayer,
//     // DialogPaymentData,
//     // setDialogPaymentData,
//   } = useContext(MyContext);

//   // fetching users

//   useEffect(() => {
//     const fetchUsers = () => {
//       axios
//         .get(
//           // '/api/public/dashboard/getAgent'
//           "https://app.yallapadel.club/public/dashboard/getPaymentsInfo"
//         )
//         .then((response) => {
//           if (Array.isArray(response.data.data)) {
//             setUsers(response.data.data);
//             setError(false);
//             // console.log(response.data.data);
//           } else {
//             console.error("Expected an array but got:", response.data);
//             setError(true);
//             setUsers([]); // Fallback to an empty array
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching users:", error);
//           setUsers([]); // Handle error state
//         });
//     };

//     fetchUsers();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) =>
//       (user?.user.name || "" ).toLowerCase().includes(searchTerm.toLowerCase())||
//       (user?.user.email || "" ).toLowerCase().includes(searchTerm.toLowerCase())||
//       (user?.type || "" ).toLowerCase().includes(searchTerm.toLowerCase())||
//       String(user?.phone || "" ).toLowerCase().includes(searchTerm.toLowerCase())||
//       String(user?.id || "" ).toLowerCase().includes(searchTerm.toLowerCase())
  
//     );
//   }, [searchTerm, users]);

//   const visibleRows = useMemo(
//     () =>
//       filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [page, rowsPerPage, filteredUsers]
//   );

//   //  user navigate func
//   const handlePlayerSelect = (e) => {
//     setSelectedPlayer(e);
//     navigate("/userBooking");
//   };
//   //  vendor navigate func
//   const handleVendorSelect = (e) => {
//     setSelectedPlayer(null);
//     setSelectedUsers(e);
//     navigate("/vendorItems");
//   };

//   // handle dialog data
//   const handleRowClick = (data) => {
//     setDialogData(data);
//     setSortOpen(true);
//     // console.log(data);
//   };
//   const handleSortClose = () => {
//     setSortOpen(false);
//   };
//   const handleSortChange = (event) => {
//     setSortValue(event.target.value);
//   };

//   return (
//     <>
//       <PaymentModal
//         sortOpen={sortOpen}
//         handleSortClose={handleSortClose}
//         sortValue={sortValue}
//         handleSortChange={handleSortChange}
//         handleUserNavigation={handlePlayerSelect}
//         handleVendorNavigation={handleVendorSelect}
//         user={dialogData}
//       />

//       <Box sx={{ width: "100%" }}>
//         <Paper
//           sx={{
//             width: "100%",
//             mb: 2,
//             backgroundColor: "#272D35",
//             color: "#fff",
//             padding: "20px",
//             borderRadius: "20px",
//           }}
//         >
//           <Toolbar
//             sx={{
//               pl: { sm: 2 },
//               pr: { xs: 1, sm: 1 },
//             }}
//           >
//             <Typography
//               sx={{ flex: "1 1 100%" }}
//               variant="h6"
//               id="tableTitle"
//               component="div"
//             >
//               <div className="table-header flex-row">
//                 <div className="search flex-row">
//                   <CiSearch className="icon" />
//                   <input
//                     placeholder="search"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <div className="btns flex-row">
//                   <button
//                     className="filter flex-row"
//                     // onClick={() => handleClickFilterOpen()}
//                   >
//                     <CiFilter className="icon" />
//                     <span>Filter</span>
//                   </button>
//                   <button
//                     className="sort flex-row"
//                     // onClick={() => handleClickSortOpen()}
//                   >
//                     <BiSort className="icon" />
//                     <span>Sort</span>
//                   </button>
//                 </div>
//               </div>
//             </Typography>
//           </Toolbar>
//           <TableContainer>
//             <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
//               <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
//                 <TableRow>
//                   <TableCell sx={{ color: "#AAADAF" }}>ID</TableCell>
//                   <TableCell sx={{ color: "#AAADAF" }}>User Name</TableCell>
//                   <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                     Phone
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                     Total
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                     Type
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                     Status
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {visibleRows.map((row) => (
//                   <TableRow
//                     hover
//                     tabIndex={-1}
//                     key={row.id}
//                     onClick={() => handleRowClick(row)}
//                     sx={{ cursor: "pointer" }}
//                   >
//                     <TableCell align="left" sx={{ color: "#fff" }}>
//                       <>{row.id}</>
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       scope="row"
//                       sx={{
//                         color: "#fff",
//                         display: "flex",
//                         gap: "5px",
//                         alignItems: "center",
//                       }}
//                     >
//                       {/* <span className="toggle-span">User Name</span> */}
//                       <>
//                         <Avatar src={row.user.image}></Avatar>
//                         {row.user.name ? row.user.name : "null"}
//                       </>
//                     </TableCell>
//                     <TableCell align="center" sx={{ color: "#fff" }}>
//                       <>{row.phone ? row.phone : "null"}</>
//                     </TableCell>
//                     <TableCell align="center" sx={{ color: "#fff" }}>
//                       <div className=" flex-row">
//                         {row.total ? row.total : "null"}{" "}
//                         {row.currency ? row.currency : "$"}
//                       </div>
//                     </TableCell>
//                     <TableCell align="center" sx={{ color: "#fff" }}>
//                       <>{row.type}</>
//                     </TableCell>
//                     <TableCell align="center" sx={{ color: "#fff" }}>
//                       <>
//                       {row.status==0?
//                         <span style={{padding:"10px 20px" , backgroundColor:"rgb(204, 204, 58)" , borderRadius:"5px"}}>Pending</span> :
//                         <span style={{padding:"10px 20px" , backgroundColor:" rgb(44, 170, 44)" , borderRadius:"5px"}}>Approved</span> 
//                        }
//                       </>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             component="div"
//             className="table-pag"
//             count={users.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             sx={{
//               color: "#fff",
//               // overflowX: "hidden",
//               "& .MuiSelect-icon": { color: "#fff" },
//               "& .MuiTablePagination-actions button": { color: "#fff" },
//               "@media (max-width: 550px)": {
//                 display: "flex",
//                 flexDirection: "column",
//               },
//             }}
//           />
//         </Paper>
//       </Box>
//     </>
//   );
// }
export default function PaymentTable() {
  const navigate = useNavigate();

  const [sortValue, setSortValue] = useState("most paid");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isSmallScreen = useMediaQuery("(max-width:930px)");

  const staticUsers = [
    {
      id: 1,
      user: { name: "John Doe", image: "" },
      phone: "1234567890",
      total: 150,
      currency: "$",
      type: "Player",
      status: 0, // 0 = Pending, 1 = Approved
    },
    {
      id: 2,
      user: { name: "Jane Smith", image: "" },
      phone: "9876543210",
      total: 200,
      currency: "$",
      type: "Vendor",
      status: 1, // 0 = Pending, 1 = Approved
    },
    {
      id: 3,
      user: { name: "Alice Johnson", image: "" },
      phone: "4561237890",
      total: 300,
      currency: "$",
      type: "Player",
      status: 0, // 0 = Pending, 1 = Approved
    },
    // Add more static user objects as needed
  ];

  const filteredUsers = useMemo(() => {
    return staticUsers.filter((user) =>
      (user?.user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user?.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user?.phone || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user?.id || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const visibleRows = useMemo(
    () =>
      filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredUsers]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (data) => {
    setDialogData(data);
    setSortOpen(true);
  };


  return (
    <>
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
                  <input
                    placeholder="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
                <TableRow>
                  <TableCell sx={{ color: "#AAADAF" }}>ID</TableCell>
                  <TableCell sx={{ color: "#AAADAF" }}>User Name</TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Type
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Status
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
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      {row.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        color: "#fff",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src={row.user.image}></Avatar>
                      {row.user.name ? row.user.name : "null"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {row.phone ? row.phone : "null"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <div className="flex-row">
                        {row.total ? row.total : "null"} {row.currency}
                      </div>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {row.type}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {row.status === 0 ? (
                        <span
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "rgb(204, 204, 58)",
                            borderRadius: "5px",
                          }}
                        >
                          Pending
                        </span>
                      ) : (
                        <span
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "rgb(44, 170, 44)",
                            borderRadius: "5px",
                          }}
                        >
                          Approved
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={staticUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              color: "#fff",
              "& .MuiSelect-icon": { color: "#fff" },
              "& .MuiTablePagination-actions button": { color: "#fff" },
            }}
          />
        </Paper>
      </Box>
    </>
  );
}
