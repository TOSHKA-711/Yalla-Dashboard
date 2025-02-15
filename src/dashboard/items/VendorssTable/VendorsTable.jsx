import React, { useContext, useEffect, useMemo, useState } from "react";
import "./VendorsTable.css";
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
import { IoMdPersonAdd } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../ContextApi/Provider";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress, DialogTitle } from "@mui/material";

function AddVendorModal({ AddVendorOpen, handleAddVendorClose }) {
  const { selectedUsers } = useContext(MyContext);
  const [image, setImage] = useState(null);
  const [withDrawPayload, setWithDrawPayload] = useState({
    image: null,
    name: "",
    email: "",
    phone: "",
    password: "",
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

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (
      !withDrawPayload.name ||
      !withDrawPayload.email ||
      !withDrawPayload.password ||
      !withDrawPayload.image ||
      !withDrawPayload.phone
    ) {
      Window.alert("Please fill in all required fields.");

      return;
    }

    setLoading(true); // Set loading state
    const formData = new FormData();
    formData.append("image", withDrawPayload.image);
    formData.append("name", withDrawPayload.name);
    formData.append("email", withDrawPayload.email);
    formData.append("phone", withDrawPayload.phone);
    formData.append("password", withDrawPayload.password);

    const url = "https://app.yallapadel.club/public/dashboard/createVendor";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      window.alert(response.data.message);
      reloadPage();
    } catch (error) {
      console.error(
        "There was an error!",
        error.response?.data || error.message
      );
      window.alert(
        "There was an error!",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // Reset loading state
      handleAddVendorClose(); // Close modal
    }
  };

  return (
    <Dialog
      open={AddVendorOpen}
      keepMounted
      onClose={handleAddVendorClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "withdraw-dialog-paper" }} // Custom CSS class for dialog
    >
      <DialogTitle className="dialog-title">{"Create Vendor"}</DialogTitle>
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
              ADD Image
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
          <div className="child with-label">
            <input
              className="second"
              name="name"
              value={withDrawPayload.name}
              onChange={handleInputChange}
              disabled={loading}
            ></input>
            <p>name</p>
          </div>
          <div className="child with-label">
            <input
              className="first"
              type="text"
              name="phone"
              value={withDrawPayload.phone}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />
            <p>Phone Number</p>
          </div>
          <div className="child with-label">
            <input
              className="first"
              type="email"
              name="email"
              value={withDrawPayload.email}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />
            <p>Gmail</p>
          </div>
          <div className="child with-label">
            <input
              className="first"
              type="password"
              name="password"
              value={withDrawPayload.password}
              onChange={handleInputChange}
              disabled={loading} // Disable input while loading
            />
            <p>Password</p>
          </div>

          <div
            className="child button"
            onClick={handleSubmitUpload}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function VendorsTable({
  handleClickSortOpen,
  handleClickFilterOpen,
}) {
  const [AddVendorOpen, setAddVendorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:930px)");
  const {
    users = [],
    setUsers,
    selectedUsers,
    setSelectedUsers,
    setSelectedPlayer,
  } = useContext(MyContext);

  // Mock User Data
  const mockUsers = [
    {
      id: "U001",
      name: "Ali Ahmed",
      email: "ali@example.com",
      phone: "0567891234",
      wallet: "250 SAR",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "U002",
      name: "Fatima Noor",
      email: "fatima@example.com",
      phone: "0581234567",
      wallet: "320 SAR",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "U003",
      name: "Mohammed Salah",
      email: "mohammed@example.com",
      phone: "0545678901",
      wallet: "150 SAR",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "U004",
      name: "Nour Hassan",
      email: "nour@example.com",
      phone: "0576543210",
      wallet: "480 SAR",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "U005",
      name: "Omar Khaled",
      email: "omar@example.com",
      phone: "0523456789",
      wallet: "500 SAR",
      image: "https://via.placeholder.com/40",
    },
  ];

  // fetching users

  useEffect(() => {
    const fetchUsers = () => {
      setUsers(mockUsers);
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
    return users.filter(
      (user) =>
        (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.id).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const visibleRows = useMemo(
    () =>
      filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredUsers]
  );

  //  navigate func
  const handleUserNavigation = (row) => {
    setSelectedUsers(row);
    setSelectedPlayer(null);
    navigate("/vendorItems");
  };

  // handle add vendor modal
  const handleAddVendorClose = () => {
    setAddVendorOpen(false);
  };
  const handleAddVendorOpen = () => {
    setAddVendorOpen(true);
  };

  return (
    <>
      <AddVendorModal
        AddVendorOpen={AddVendorOpen}
        handleAddVendorClose={handleAddVendorClose}
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
                <div className="btns add-vendor-btns flex-row">
                  <button
                    className="filter flex-row"
                    onClick={() => handleClickFilterOpen()}
                  >
                    <CiFilter className="icon" />
                    <span>Filter</span>
                  </button>
                  <button
                    className="sort flex-row"
                    onClick={() => handleClickSortOpen()}
                  >
                    <BiSort className="icon" />
                    <span>Sort</span>
                  </button>
                  <button
                    className="add flex-row"
                    onClick={() => handleAddVendorOpen()}
                  >
                    <IoMdPersonAdd className="icon" />
                    <span>Add Vendor</span>
                  </button>
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
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#AAADAF" }}>
                    Wallet
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    // value={row.Basic_ad}
                    onClick={() => handleUserNavigation(row)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      <>{row.id}</>
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
                      {/* <span className="toggle-span">User Name</span> */}
                      <>
                        <Avatar src={row.image}></Avatar>
                        {row.name ? row.name : "null"}
                      </>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.email ? row.email : "null"}</>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.phone ? row.phone : "null"}</>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <>{row.wallet}</>
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

// import React, { useContext, useEffect, useMemo, useState } from "react";
// import "./VendorsTable.css";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import { Avatar, useMediaQuery } from "@mui/material";
// import { CiSearch } from "react-icons/ci";
// import { CiFilter } from "react-icons/ci";
// import { BiSort } from "react-icons/bi";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { MyContext } from "../../ContextApi/Provider";

// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import { CircularProgress, DialogTitle } from "@mui/material";

// function AddVendorModal({ AddVendorOpen, handleAddVendorClose, addVendor }) {
//   const [image, setImage] = useState(null);
//   const [withDrawPayload, setWithDrawPayload] = useState({
//     image: null,
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWithDrawPayload((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setWithDrawPayload((prev) => ({ ...prev, image: file.name }));
//     }
//     event.target.value = ""; // Reset the input value
//   };

//   const handleUploadClick = () => {
//     document.getElementById("file-input").click();
//   };

//   useEffect(() => {
//     return () => {
//       if (image) {
//         URL.revokeObjectURL(image);
//       }
//     };
//   }, [image]);

//   const handleSubmitUpload = (e) => {
//     e.preventDefault();
//     if (
//       !withDrawPayload.name ||
//       !withDrawPayload.email ||
//       !withDrawPayload.password ||
//       !withDrawPayload.image ||
//       !withDrawPayload.phone
//     ) {
//       window.alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true); // Set loading state
//     setTimeout(() => {
//       addVendor({ ...withDrawPayload, id: Date.now(), wallet: "0.00" });
//       setLoading(false);
//       handleAddVendorClose(); // Close modal
//     }, 1000);
//   };

//   return (
//     <Dialog
//       open={AddVendorOpen}
//       keepMounted
//       onClose={handleAddVendorClose}
//       aria-describedby="alert-dialog-slide-description"
//       classes={{ paper: "withdraw-dialog-paper" }} // Custom CSS class for dialog
//     >
//       <DialogTitle className="dialog-title">{"Create Vendor"}</DialogTitle>
//       <DialogContent className="dialog-content flex-row">
//         <div className="form flex-col">
//           <div className="child with-label">
//             <input
//               type="file"
//               accept="image/*"
//               id="file-input"
//               style={{ display: "none" }}
//               onChange={handleImageChange}
//               name="image"
//             />
//             <button
//               className="child upload flex-row button"
//               onClick={handleUploadClick}
//               disabled={loading} // Disable button while loading
//             >
//               <FaCloudUploadAlt className="icon" />
//               ADD Image
//             </button>
//             {image && (
//               <div style={{ marginTop: "10px" }}>
//                 <img
//                   src={image}
//                   alt="Preview"
//                   style={{
//                     maxWidth: "100%",
//                     height: "60px",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="child with-label">
//             <input
//               className="second"
//               name="name"
//               value={withDrawPayload.name}
//               onChange={handleInputChange}
//               disabled={loading}
//             ></input>
//             <p>name</p>
//           </div>
//           <div className="child with-label">
//             <input
//               className="first"
//               type="text"
//               name="phone"
//               value={withDrawPayload.phone}
//               onChange={handleInputChange}
//               disabled={loading} // Disable input while loading
//             />
//             <p>Phone Number</p>
//           </div>
//           <div className="child with-label">
//             <input
//               className="first"
//               type="email"
//               name="email"
//               value={withDrawPayload.email}
//               onChange={handleInputChange}
//               disabled={loading} // Disable input while loading
//             />
//             <p>Gmail</p>
//           </div>
//           <div className="child with-label">
//             <input
//               className="first"
//               type="password"
//               name="password"
//               value={withDrawPayload.password}
//               onChange={handleInputChange}
//               disabled={loading} // Disable input while loading
//             />
//             <p>Password</p>
//           </div>

//           <div
//             className="child button"
//             onClick={handleSubmitUpload}
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Create"}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default function VendorsTable({
//   handleClickSortOpen,
//   handleClickFilterOpen,
// }) {
//   const [AddVendorOpen, setAddVendorOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery("(max-width:930px)");
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       phone: "123-456-7890",
//       wallet: "100.00",
//       image: "https://via.placeholder.com/50",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       phone: "098-765-4321",
//       wallet: "200.00",
//       image: "https://via.placeholder.com/50",
//     },
//   ]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter(
//       (user) =>
//         (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//         String(user.id).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, users]);

//   const visibleRows = useMemo(
//     () =>
//       filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [page, rowsPerPage, filteredUsers]
//   );

//   // handle add vendor modal
//   const handleAddVendorClose = () => {
//     setAddVendorOpen(false);
//   };
//   const handleAddVendorOpen = () => {
//     setAddVendorOpen(true);
//   };

//   const addVendor = (newVendor) => {
//     setUsers((prevUsers) => [...prevUsers, newVendor]);
//   };

//   return (
//     <>
//       <AddVendorModal
//         AddVendorOpen={AddVendorOpen}
//         handleAddVendorClose={handleAddVendorClose}
//         addVendor={addVendor}
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
//                     className="btn filter flex-row"
//                     onClick={handleClickFilterOpen}
//                   >
//                     <CiFilter className="icon" />
//                     Filter
//                   </button>
//                   <button
//                     className="btn sort flex-row"
//                     onClick={handleClickSortOpen}
//                   >
//                     <BiSort className="icon" />
//                     Sort
//                   </button>
//                   <button
//                     className="btn add flex-row"
//                     onClick={handleAddVendorOpen}
//                   >
//                     <IoMdPersonAdd className="icon" />
//                     Add Vendor
//                   </button>
//                 </div>
//               </div>
//             </Typography>
//           </Toolbar>
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={"medium"}
//             >
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center" style={{ color: "#fff" }}>
//                     ID
//                   </TableCell>
//                   <TableCell align="center" style={{ color: "#fff" }}>
//                     Vendor
//                   </TableCell>
//                   <TableCell align="center" style={{ color: "#fff" }}>
//                     Contact
//                   </TableCell>
//                   <TableCell align="center" style={{ color: "#fff" }}>
//                     Wallet
//                   </TableCell>
//                   <TableCell align="center" style={{ color: "#fff" }}>
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {visibleRows.map((user) => (
//                   <TableRow hover key={user.id}>
//                     <TableCell align="center" style={{ color: "#fff" }}>
//                       {user.id}
//                     </TableCell>
//                     <TableCell align="center" style={{ color: "#fff" }}>
//                       <div className="flex-row align-center">
//                         <Avatar alt={user.name} src={user.image} />
//                         <span style={{ marginLeft: "10px" }}>{user.name}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell align="center" style={{ color: "#fff" }}>
//                       {user.email}
//                       <br />
//                       {user.phone}
//                     </TableCell>
//                     <TableCell align="center" style={{ color: "#fff" }}>
//                       ${user.wallet}
//                     </TableCell>
//                     <TableCell align="center" style={{ color: "#fff" }}>
//                       <button
//                         onClick={() => navigate(`/vendors/${user.id}`)}
//                         style={{
//                           color: "#fff",
//                           padding: "5px 10px",
//                           borderRadius: "5px",
//                           border: "1px solid #fff",
//                           background: "transparent",
//                           cursor: "pointer",
//                         }}
//                       >
//                         View
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredUsers.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             style={{ color: "#fff" }}
//           />
//         </Paper>
//       </Box>
//     </>
//   );
// }
