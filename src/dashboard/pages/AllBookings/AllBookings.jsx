import React, { useContext, useEffect, useState } from "react";
import "./AllBookings.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../ContextApi/Provider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../../assets/imgs/padel_court_2.png";

export default function AllBookings() {
  const { selectedUsers, setSelectedBook } = useContext(MyContext);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          // `/api/public/dashboard/getAllBooking`
          `https://app.yallapadel.club/public/dashboard/getAllBooking`
          );
        setUser(response.data.data || []);
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

  const handleCardClick = (book) => {
    setSelectedBook(book);
    navigate("/bookPage");
  };

  if (loading) return <CircularProgress />; // Use CircularProgress for loading state
  if (error) return <h2>{error}</h2>; // Consider using a Snackbar or Alert for error messages

  return (
    <div className="cards">
      {user.length > 0 ? (
        user.map((book) => (
          <Card
            key={book.id}
            sx={{
              display: "flex",
              padding: "10px",
              gap: "10px",
              background: "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(book)}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" sx={{ color: "#fff" }}>
                  {book.item.title}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ color: "#fff" }}>
                  <span className="flex-col" style={{ alignItems: "flex-start" }}>
                    <p>{book.scheduled.formatted_date}</p>
                    <p>{book.scheduled.time} KSA</p>
                  </span>
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ color: "#fff" }}>
                  {book.item.price} SAR
                </Typography>
              </CardContent>
            </Box>
            <CardMedia component="img" sx={{ width: 200 }} image={img} alt="Booking Image" />
          </Card>
        ))
      ) : (
        <h1>No bookings found.</h1> // Display a message if no bookings exist
      )}
    </div>
  );
}
