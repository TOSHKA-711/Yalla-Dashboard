import React, { useContext, useEffect, useState } from "react";
import "./Ads.css";
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

export default function Ads() {
  const { selectedUsers, setSelectedAd } = useContext(MyContext);
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
          // `/api/public/dashboard/getAgentById/${selectedUsers.id}`
          // `/api/public/dashboard/getAllItems`
          `https://app.yallapadel.club/public/dashboard/getAllItems`
        );

        setUser(response.data.data);
        console.log(response.data.data);

        if (
          response.data.data &&
          response.data.data.length > 0
        ) {
          setUserBookingLength(true);
        } else {
          setUserBookingLength(false);
        }

        console.log(response.data.data);
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
    setSelectedAd(book);
    navigate("/itemPage");
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="cards ad" >
      {userBookingLength ? (
        user.map((book) => {
          return (
            <Card
              key={book.id}
              sx={{
                display: "flex",
                padding: "10px",
                gap: "10px",
                background:
                  "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))  ",
                cursor: "pointer",
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
                    {book.title}
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
                      <p>{book.description} </p>
                      <p>{book.item_type} </p>
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", color: "#fff" }}
                  >
                    {book.price} $
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "10rem" , height:"8rem" }}
                image={book.image}
                // image={img}
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
