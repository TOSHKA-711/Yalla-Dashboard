import React, { useContext, useEffect, useState } from "react";
import "./ItemPage.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img from "../../../assets/imgs/padel_court_2.png";
import { MyContext } from "../../ContextApi/Provider";
import { useNavigate } from "react-router-dom";

export default function ItemPage() {
  const navigate = useNavigate();
  const { selectedAd, setSelectedFacility } = useContext(MyContext);
  const [facility, setFacility] = useState(false);

  useEffect(() => {
    const facilityCheck = () => {
      if (selectedAd.facility.length === 0) {
        setFacility(false);
      } else {
        setFacility(true);
      }
    };

    facilityCheck();
  }, []);

  const handleCardClick = (ad) => {
    setSelectedFacility(ad);
    // navigate("/itemDetailsPage");
  };

  return (
    <>
      {facility ? (
        <div className=" items-cards">
          {selectedAd ? (
            selectedAd.facility.map((ad) => {
              const dateStr = ad.created_at;
              const date = new Date(dateStr);
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              const formattedDate = new Intl.DateTimeFormat(
                "en-US",
                options
              ).format(date);
              return (
                <Card
                  key={ad.id}
                  sx={{
                    display: "flex",
                    padding: "10px",
                    justifyContent:"space-between",
                    gap: "10px",
                    background:
                      "linear-gradient(90deg, #3c97f3, rgba(60, 151, 243, 0))  ",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(ad)}
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
                        {ad.title}
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
                          <p>{ad.title_ar} </p>
                          <p>{ad.email} </p>
                        </span>
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary", color: "#fff" }}
                      >
                        {formattedDate}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: "10rem", height: "8rem", alignSelf:"center" }}
                    image={selectedAd.image ? selectedAd.image : img}
                    alt="Live from space album cover"
                  />
                </Card>
              );
            })
          ) : (
            <h1>No ADS found.</h1>
          )}
        </div>
      ) : (
        <h1>No Facilities found.</h1>
      )}
    </>
  );
}
