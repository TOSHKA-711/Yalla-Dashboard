import React, { useContext, useEffect, useState } from "react";
import "./UserBookingCard.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img from "../../../assets/imgs/padel_court_2.png";
import { MyContext } from "../../ContextApi/Provider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserBookingCard() {
  const { selectedUsers, setSelectedBook } = useContext(MyContext);
  const [user, setUser] = useState(null);
  const [userBookingLength, setUserBookingLength] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://app.yallapadel.club/public/dashboard/getUserById/${selectedUsers.id}`
          // `/api/public/dashboard/getUserById/${selectedUsers.id}`
          // `/api/public/dashboard/getUserById/9}`
        );

        setUser(response.data.data);
        // console.log(response.data.data);

        if (
          response.data.data.all_bookings &&
          response.data.data.all_bookings.length > 0
        ) {
          setUserBookingLength(true);
        } else {
          setUserBookingLength(false);
        }

        // console.log(response.data.data.all_bookings);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedUsers.id) {
      fetchUser();
    }
  }, [selectedUsers.id]);

  // handle click booking card

  const handleCardClick = (book) => {
    setSelectedBook(book);
    navigate("/bookPage");
  };

  if (loading) return <h3>Loading...</h3>; // Loading state
  if (error) return <h3>{error}</h3>; // Error state

  return (
    <div className="cards">
      {userBookingLength ? (
        user.all_bookings.map((book) => {
          return (
            <Card
              key={book.id}
              sx={{
    display: "flex",
    padding: "10px",
    justifyContent: "space-between",
    background: "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))",
    cursor: "pointer",
    flexDirection: { xs: "column-reverse", sm: "row" },
    alignItems: { xs: "center", sm: "flex-start" },
    gap: { xs: 0, sm: "10px" },
    width: { xs: "100%", md: "auto" }, // Full width on smaller screens
  }}
              onClick={() => handleCardClick(book)}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    backgroundColor: "",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: "#fff" }}
                  >
                    {book.item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", color: "#fff" }}
                  >
                    <span
                      className=" flex-col"
                      style={{ alignItems: "flex-start" }}
                    >
                      <p>{book.scheduled.formatted_date} </p>
                      <p>{book.scheduled.time} KSA</p>
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", color: "#fff" }}
                  >
                    {book.item.price} SAR
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={img}
                alt="Live from space album cover"
              />
            </Card>
          );
        })
      ) : (
        <h1>No bookings found.</h1> // Display a message if no bookings exist
      )}
    </div>
  );
}
