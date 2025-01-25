

// import React, { useContext, useEffect, useMemo, useState } from "react";
// import "../../items/UsersTable/UsersTable.css";
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

// export default function Ads({}) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery("(max-width:930px)");
//   const {
//     users = [],
//     setUsers,
//     setSelectedAd
//   } = useContext(MyContext);

//   // fetching users

//   useEffect(() => {
//     const fetchUsers = () => {
//       axios
//         .get("https://app.yallapadel.club/public/dashboard/getAllItems")
//         .then((response) => {
//           // Ensure response data is an array before setting it to state
//           if (Array.isArray(response.data.data)) {
//             setUsers(response.data.data);
//             // console.log(response.data.data);
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
//       (user?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       String(user.price || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
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
//     setSelectedAd(row);
//     navigate("/itemDetailsPage");
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
//                   // onClick={() => handleClickFilterOpen()}
//                 >
//                   <CiFilter className="icon" />
//                   <span>Filter</span>
//                 </button>
//                 <button
//                   className="sort flex-row"
//                   // onClick={() => handleClickSortOpen()}
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
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Title
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Price
//                 </TableCell>

//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Location
//                 </TableCell>

//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Type
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
//                   <TableCell align="left" sx={{ color: "#fff" }}>
//                     <>{row?.id || ""}</>
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row ? row.title : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row ? row.price : "null"}</>
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.city ? row.city.path : "null"}</>
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row ? row.item_type : "null"}</>
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
import "../../items/UsersTable/UsersTable.css";
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
import { useMediaQuery } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../ContextApi/Provider";

const STATIC_USERS = [
  { id: 1, title: "Ad 1", price: 100, city: { path: "Cairo" }, item_type: "Type A" },
  { id: 2, title: "Ad 2", price: 200, city: { path: "Giza" }, item_type: "Type B" },
  { id: 3, title: "Ad 3", price: 300, city: { path: "Alexandria" }, item_type: "Type C" },
  { id: 4, title: "Ad 4", price: 400, city: { path: "Aswan" }, item_type: "Type D" },
  { id: 5, title: "Ad 5", price: 500, city: { path: "Luxor" }, item_type: "Type E" },
  { id: 6, title: "Ad 6", price: 600, city: { path: "Suez" }, item_type: "Type F" },
];

export default function Ads({}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:930px)");
  const {
    setSelectedAd
  } = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = useMemo(() => {
    return STATIC_USERS.filter((user) =>
      (user?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.price || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.id).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const visibleRows = useMemo(
    () =>
      filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredUsers]
  );

  //  navigate func
  const handleUserNavigation = (row) => {
    setSelectedAd(row);
    navigate("/itemDetailsPage");
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
                <button className="filter flex-row">
                  <CiFilter className="icon" />
                  <span>Filter</span>
                </button>
                <button className="sort flex-row">
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
                <TableCell align="center" sx={{ color: "#AAADAF" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ color: "#AAADAF" }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ color: "#AAADAF" }}>
                  Location
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
                  onClick={() => handleUserNavigation(row)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left" sx={{ color: "#fff" }}>
                    {row?.id || ""}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row?.title || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row?.price || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row?.city?.path || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row?.item_type || "null"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={STATIC_USERS.length}
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
