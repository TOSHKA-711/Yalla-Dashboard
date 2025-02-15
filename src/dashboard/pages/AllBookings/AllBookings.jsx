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

// export default function AllBookings({}) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery("(max-width:930px)");
//   const {
//     users = [],
//     setUsers,
//     selectedUsers,
//     setSelectedUsers,
//     setSelectedPlayer,
//     setSelectedBook,
//   } = useContext(MyContext);

//   // fetching users

//   useEffect(() => {
//     const fetchUsers = () => {
//       axios
//         .get("https://app.yallapadel.club/public/dashboard/getAllBooking")
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
//       (user.item?.title || "").toLowerCase().includes(searchTerm.toLowerCase())||
//       (user.item?.item_type || "").toLowerCase().includes(searchTerm.toLowerCase())||
//      String(user.item_price?.price || "").toLowerCase().includes(searchTerm.toLowerCase())||
//       String(user.item?.id || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, users]);

//   const visibleRows = useMemo(
//     () =>
//       filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [page, rowsPerPage, filteredUsers]
//   );

//   //  navigate func
//   const handleUserNavigation = (row) => {
//     setSelectedBook(row);
//     setSelectedPlayer(null);

//     navigate("/bookPage");
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
//                   scheduled
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Location
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: "#AAADAF" }}>
//                   Playground
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
//                     <>{row.item?.id || ""}</>
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.item ? row.item.title : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.item_price ? row.item_price.price : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.scheduled ? row.scheduled.formatted_date : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.item ? row.item.city.path : "null"}</>
//                   </TableCell>
//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>
//                       {row.playground
//                         ? row.playground.num_of_playground
//                         : "null"}
//                     </>
//                   </TableCell>

//                   <TableCell align="center" sx={{ color: "#fff" }}>
//                     <>{row.item ? row.item.item_type : "null"}</>
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

// // export default function AllBookings() {
// //   const { selectedUsers, setSelectedBook } = useContext(MyContext);
// //   const [user, setUser] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const response = await axios.get(
// //           `https://app.yallapadel.club/public/dashboard/getAllBooking`
// //         );
// //         setUser(response.data.data || []);
// //       } catch (error) {
// //         console.error("Error fetching user:", error);
// //         setError("Failed to load user data.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (selectedUsers.id) {
// //       fetchUser();
// //     }
// //   }, [selectedUsers.id]);

// //   const handleCardClick = (book) => {
// //     setSelectedBook(book);
// //     navigate("/bookPage");
// //   };

// //   if (loading) return <CircularProgress />;
// //   if (error) return <Failed text={error} />;

// //   return (
// //     // <div className="cards">
// //     //   {user.length > 0 ? (
// //     //     user.map((book) => (
// //     //       <Card
// //     //         key={book.id}
// //     //         className="card"
// //     //         sx={{
// //     //           display: "flex",
// //     //           padding: "10px",
// //     //           justifyContent: "space-between",
// //     //           background:
// //     //             "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))",
// //     //           cursor: "pointer",
// //     //           flexDirection: { xs: "column-reverse", sm: "row" },
// //     //           alignItems: { xs: "center", sm: "flex-start" },
// //     //           gap: { xs: 0, sm: "10px" },
// //     //           width: { xs: "100%", md: "auto" }, // Full width on smaller screens
// //     //         }}
// //     //         onClick={() => handleCardClick(book)}
// //     //       >
// //     //         <Box sx={{ display: "flex", flexDirection: "column" }}>
// //     //           <CardContent sx={{ flex: "1 0 auto" }}>
// //     //             <Typography component="div" variant="h5" sx={{ color: "#fff" }}>
// //     //               {book.item.title}
// //     //             </Typography>
// //     //             <Typography
// //     //               variant="subtitle1"
// //     //               component="div"
// //     //               sx={{ color: "#fff" }}
// //     //             >
// //     //               <span
// //     //                 className="flex-col"
// //     //                 style={{ alignItems: "flex-start" }}
// //     //               >
// //     //                 <p>{book.scheduled.formatted_date}</p>
// //     //                 <p>{book.scheduled.time} KSA</p>
// //     //               </span>
// //     //             </Typography>
// //     //             <Typography
// //     //               variant="subtitle1"
// //     //               component="div"
// //     //               sx={{ color: "#fff" }}
// //     //             >
// //     //               {book.item_price.price} SAR
// //     //             </Typography>
// //     //           </CardContent>
// //     //         </Box>
// //     //         <CardMedia
// //     //           component="img"
// //     //           sx={{ width: 200 }}
// //     //           image={img}
// //     //           alt="Booking Image"
// //     //         />
// //     //       </Card>
// //     //     ))
// //     //   ) : (
// //     //     <h1>No bookings found.</h1>
// //     //   )}
// //     // </div>

// //   );
// // }


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

const STATIC_BOOKINGS = [
  {
    id: 1,
    item: {
      id: "001",
      title: "Booking Title 1",
      item_type: "Type A",
      city: { path: "Location 1" },
    },
    item_price: { price: 100 },
    scheduled: { formatted_date: "2025-01-25" },
    playground: { num_of_playground: 2 },
  },
  {
    id: 2,
    item: {
      id: "002",
      title: "Booking Title 2",
      item_type: "Type B",
      city: { path: "Location 2" },
    },
    item_price: { price: 200 },
    scheduled: { formatted_date: "2025-01-26" },
    playground: { num_of_playground: 3 },
  },
  // Add more bookings as needed
];

export default function AllBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:930px)");
  const { setSelectedBook, setSelectedPlayer } = useContext(MyContext);

  const filteredUsers = useMemo(() => {
    return STATIC_BOOKINGS.filter((user) =>
      (user.item?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.item?.item_type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.item_price?.price || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.item?.id || "").toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleUserNavigation = (row) => {
    setSelectedBook(row);
    setSelectedPlayer(null);
    navigate("/bookPage");
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
                  Scheduled
                </TableCell>
                <TableCell align="center" sx={{ color: "#AAADAF" }}>
                  Location
                </TableCell>
                <TableCell align="center" sx={{ color: "#AAADAF" }}>
                  Playground
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
                    {row.item?.id || ""}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.item?.title || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.item_price?.price || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.scheduled?.formatted_date || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.item?.city?.path || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.playground?.num_of_playground || "null"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    {row.item?.item_type || "null"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
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
