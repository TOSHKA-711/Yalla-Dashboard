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
import Failed from "../Failed/Failed";
import { CircularProgress } from "@mui/material";

export default function UserBookingCard() {
  const { selectedUsers, setSelectedBook, selectedPlayer } =
    useContext(MyContext);
  const [user, setUser] = useState(null);
  const [userBookingLength, setUserBookingLength] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  // Mock Static Data
  const mockBookings = [
    {
      id: "B001",
      item: { title: "Football Field", id: "F101" },
      scheduled: { formatted_date: "2025-02-15", time: "18:30" },
      item_price: { price: 150 },
      img: "https://via.placeholder.com/160/0000FF/FFFFFF?text=Football",
    },
    {
      id: "B002",
      item: { title: "Basketball Court", id: "B202" },
      scheduled: { formatted_date: "2025-02-16", time: "20:00" },
      item_price: { price: 200 },
      img: "https://via.placeholder.com/160/FF4500/FFFFFF?text=Basketball",
    },
    {
      id: "B003",
      item: { title: "Tennis Court", id: "T303" },
      scheduled: { formatted_date: "2025-02-17", time: "17:00" },
      item_price: { price: 120 },
      img: "https://via.placeholder.com/160/008000/FFFFFF?text=Tennis",
    },
    {
      id: "B004",
      item: { title: "Swimming Pool", id: "S404" },
      scheduled: { formatted_date: "2025-02-18", time: "16:30" },
      item_price: { price: 180 },
      img: "https://via.placeholder.com/160/00FFFF/000000?text=Swimming",
    },

  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(mockBookings);
        setUserBookingLength(true);
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

  if (loading)
    return (
      <h3>
        <CircularProgress />
      </h3>
    ); // Loading state
  if (error) return <Failed text={error} />; // Error state

  return (
    <div className="cards">
      {userBookingLength ? (
        user.map((book) => {
          return (
            <Card
              key={book.id}
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
                background:
                  "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))",
                cursor: "pointer",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: { xs: 0, sm: "10px" },
                width: { xs: "100%", md: "auto" }, // Full width on smaller screens
              }}
              className="booking-card"
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
                    {book.item_price.price} SAR
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", color: "#fff" }}
                  >
                    ID- {book.item.id}
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{
                  width: 160,
                  alignSelf: "center",
                  "@media(max-width:1500px)": {
                    width: 200,
                  },
                }}
                image={img}
                alt="Live from space album cover"
              />
            </Card>
          );
        })
      ) : (
        <h2>No bookings found.</h2> // Display a message if no bookings exist
      )}
    </div>
  );
}
