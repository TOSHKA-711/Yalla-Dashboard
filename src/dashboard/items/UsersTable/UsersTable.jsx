// import React, { useContext, useEffect, useMemo, useState } from "react";
// import "./UsersTable.css";
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
// import { useNavigate } from "react-router-dom";
// import { MyContext } from "../../ContextApi/Provider";
// import axios from "axios";

// export default function UsersTable({
//   handleClickSortOpen,
//   handleClickFilterOpen,
// }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery("(max-width:930px)");
//   const { users =[], setUsers, selectedUsers, setSelectedUsers , setSelectedPlayer ,setSelectedBook} =
//     useContext(MyContext);

//   // fetching users

//   useEffect(() => {
//     const fetchUsers = () => {
//       axios
//         .get(
//           'https://app.yallapadel.club/public/dashboard/getUsers'
//           // '/api/public/dashboard/getUsers'
//         )
//         .then((response) => {
//           // Ensure response data is an array before setting it to state
//           if (Array.isArray(response.data.data)) {
//             setUsers(response.data.data);
//           } else {
//             console.error("Expected an array but got:", response.data);
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
//       (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       String(user.id).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, users]);
  

//   const visibleRows = useMemo(
//     () =>
//       filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [page, rowsPerPage, filteredUsers]
//   );

//   //  navigate func
//   const handleUserNavigation = (row) => {
    
//     setSelectedUsers(row);
//     setSelectedPlayer(null);

//     navigate("/userBooking");
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Paper
//         sx={{
//           width: "100%",
//           mb: 2,
//           backgroundColor: "#272D35",
//           color: "#fff",
//           padding: "20px",
//           borderRadius: "20px",
//         }}
//       >
//         <Toolbar
//           sx={{
//             pl: { sm: 2 },
//             pr: { xs: 1, sm: 1 },
//           }}
//         >
//           <Typography
//             sx={{ flex: "1 1 100%" }}
//             variant="h6"
//             id="tableTitle"
//             component="div"
//           >
//             <div className="table-header flex-row">
//               <div className="search flex-row">
//                 <CiSearch className="icon" />
//                 <input
//                   placeholder="search"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="btns flex-row">
//                 <button
//                   className="filter flex-row"
//                   onClick={() => handleClickFilterOpen()}
//                 >
//                   <CiFilter className="icon" />
//                   <span>Filter</span>
//                 </button>
//                 <button
//                   className="sort flex-row"
//                   onClick={() => handleClickSortOpen()}
//                 >
//                   <BiSort className="icon" />
//                   <span>Sort</span>
//                 </button>
//               </div>
//             </div>
//           </Typography>
//         </Toolbar>
//         <TableContainer>
//           <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
//             <TableHead className={`table-head ${isSmallScreen && "hidden"}`}>
//               <TableRow>
//                 <TableCell sx={{ color: "#AAADAF" }}>ID</TableCell>
//                 <TableCell sx={{ color: "#AAADAF" }}>User Name</TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Email
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Phone
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Wallet
//                 </TableCell>
          
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {visibleRows.map((row) => (
//                 <TableRow
//                   hover
//                   tabIndex={-1}
//                   key={row.id}
//                   // value={row.Basic_ad}
//                   onClick={() => handleUserNavigation(row)}
//                   sx={{ cursor: "pointer" }}
//                 >
//                    <TableCell align="left" sx={{ color: "#fff" }}>
                  
//                     <>{row.id}</>
//                   </TableCell>
//                   <TableCell
//                     component="th"
//                     scope="row"
//                     sx={{
//                       color: "#fff",
//                       display: "flex",
//                       gap: "5px",
//                       alignItems: "center",
//                     }}
//                   >
               
//                     <>
//                       <Avatar src={row.image}></Avatar>
//                       {row.name?row.name : "null"}
//                     </>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
              
//                     <>{row.email?row.email : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
               
//                     <>{row.phone?row.phone : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
                  
//                     <>{row.wallet}</>
//                   </TableCell>
        
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={users.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             color: "#fff",
//             // overflowX:"hidden",
//             "& .MuiSelect-icon": { color: "#fff" },
//             "& .MuiTablePagination-actions button": { color: "#fff" },
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// }



import React, { useContext, useMemo, useState } from "react";
import "./UsersTable.css";
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
import { MyContext } from "../../ContextApi/Provider";

export default function UsersTable({
  handleClickSortOpen,
  handleClickFilterOpen,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:930px)");
    const { setUsers, selectedUsers, setSelectedUsers , setSelectedPlayer ,setSelectedBook} =
    useContext(MyContext);




  // بيانات ثابتة للاختبار
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123456789", wallet: 50, image: "" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987654321", wallet: 75, image: "" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555666777", wallet: 100, image: "" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", phone: "444333222", wallet: 25, image: "" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", phone: "111222333", wallet: 150, image: "" },
    { id: 6, name: "John Doe", email: "john.doe@example.com", phone: "123456789", wallet: 50, image: "" },
    { id: 7, name: "Jane Smith", email: "jane.smith@example.com", phone: "987654321", wallet: 75, image: "" },
    { id: 8, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555666777", wallet: 100, image: "" },
    { id: 9, name: "Bob Brown", email: "bob.brown@example.com", phone: "444333222", wallet: 25, image: "" },
    { id: 10, name: "Charlie Davis", email: "charlie.davis@example.com", phone: "111222333", wallet: 150, image: "" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
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

  const handleUserNavigation = (row) => {
    console.log("Navigating to user details:", row);
    navigate("/userBooking");

    setSelectedUsers(row);
    setSelectedPlayer(null);
  };


  return (
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
                  onClick={() => handleUserNavigation(row)}
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
                    <Avatar src={row.image}></Avatar>
                    {row.name || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.email || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.phone || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.wallet}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
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
  );
}
