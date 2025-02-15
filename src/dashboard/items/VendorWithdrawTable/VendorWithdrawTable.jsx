import React, { useContext, useEffect, useMemo, useState } from "react";
import "./VendorWithdrawTable.css";
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

export default function VendorWithdrawTable({ url, title }) {
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


  const staticWithdrawals = [
    {
      id: "W001",
      user: {
        id: "U1001",
        phone: "+966123456789",
        type: "Bank Transfer",
      },
      vendor_id: "V2001",
      withdrawal_amount: 500,
      currency: "SAR",
    },
    {
      id: "W002",
      user: {
        id: "U1002",
        phone: "+966987654321",
        type: "PayPal",
      },
      vendor_id: "V2002",
      withdrawal_amount: 700,
      currency: "SAR",
    },
    {
      id: "W003",
      user: {
        id: "U1003",
        phone: "+966567890123",
        type: "Cash",
      },
      vendor_id: "V2003",
      withdrawal_amount: 1000,
      currency: "SAR",
    },
  ];

  // fetching users

  useEffect(() => {
    const fetchUsers = () => {
      setUsers(staticWithdrawals);
      setError(false);
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
        (user?.user.type || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(user?.user.phone || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(user?.id || "")
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

  return (
    <>
      {users.length > 0 ? (
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
                <TableHead
                  className={`table-head ${isSmallScreen && "hidden"}`}
                >
                  <TableRow>
                    <TableCell align="center" sx={{ color: "#AAADAF" }}>
                      Withdraw-ID
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#AAADAF" }}>
                      User-ID
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#AAADAF" }}>
                      Vendor-ID
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
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        <>{row.id}</>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ color: "#fff" }}
                      >
                        {row.user.id ? row.user.id : "null"}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ color: "#fff" }}
                      >
                        {row ? row.vendor_id : "null"}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        <>{row ? row.user.phone : "null"}</>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        <div className=" flex-row">
                          {row ? row.withdrawal_amount : "null"}{" "}
                          {row ? row.currency : "$"}
                        </div>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        <>{row.user.type}</>
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
      ) : (
        <h2>No WithDraws</h2>
      )}
    </>
  );
}
