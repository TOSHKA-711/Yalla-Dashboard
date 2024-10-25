import React, { useContext, useEffect, useState } from "react";
import "./AdsCard.css";
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

export default function AdsCard() {
  const { selectedUsers, setSelectedAd } = useContext(MyContext);
  const [user, setUser] = useState(null);
  const [userBookingLength, setUserBookingLength] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

// console.log(selectedUsers);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://app.yallapadel.club/public/dashboard/getAgentById/${selectedUsers.id}`
        );

        setUser(response.data.data);
          //  console.log("=>user", response.data.data);

        if (response.data.data.items && response.data.data.items.length > 0) {
          setUserBookingLength(true);
        } else {
          setUserBookingLength(false);
        }

        // console.log(response.data.data.items);
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
    navigate("/itemDetailsPage");
  };

  if (loading) return <h3><CircularProgress/></h3>; // Loading state
  if (error) return <Failed text="Fetching Data Failed ...!" />; // Error state

  return (
    <div className="cards ad">
      {userBookingLength ? (
        user.items.map((book) => {
          return (
            <Card
              key={book.id}
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
                gap: "10px",
                background:
                  "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))  ",
                cursor: "pointer",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: { xs: 0, sm: 2 },
              }}
              onClick={() => handleCardClick(book)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  width: "100%",
                }}
              >
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
                    {book.price} SAR
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "20rem", height: "10rem", alignSelf: "center" , "@media (max-width : 600px) " : {
                  width: "15rem",
                  height: "8rem",
                } }}
                image={book.image ? book.image : img}
                alt="Live from space album cover"
              />
            </Card>
          );
        })
      ) : (
        <h2>No bookings found ...</h2> // Display a message if no bookings exist
      )}
    </div>
  );
}
