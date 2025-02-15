
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import "./MuiPieChart.css";

const normalize = (v, total) => Number.parseFloat(((v / total) * 100).toFixed(2));
const valueFormatter = (item) => `${item.value}%`;

export default function MuiPieChart() {
  const [desktopOS, setDesktopOS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://app.yallapadel.club/public/dashboard/getCardCounter");
  //       const { total_users, playgrounds, bookings, total_items } = response.data;

  //       // Create data structure for the pie chart
  //       const data = [
  //         {
  //           label: 'bookings',
  //           value: normalize(bookings, total_users),
  //           color: '#3C97F3',
  //         },
  //         {
  //           label: 'playgrounds',
  //           value: normalize(playgrounds, total_users),
  //           color: '#FF3B30',
  //         },
  //         {
  //           label: 'Items',
  //           value: normalize(total_items, total_users),
  //           color: '#D862F6',
  //         },
  //       ];

  //       setDesktopOS(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setError('Failed to load data. Please try again later.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    // بيانات ثابتة
    const mockData = {
      total_users: 1000,
      playgrounds: 200,
      bookings: 500,
      total_items: 300,
    };

    try {
      // إنشاء البيانات للـ Pie Chart
      const { total_users, playgrounds, bookings, total_items } = mockData;

      const data = [
        { label: "bookings", value: normalize(bookings, total_users), color: "#3C97F3" },
        { label: "playgrounds", value: normalize(playgrounds, total_users), color: "#FF3B30" },
        { label: "Items", value: normalize(total_items, total_users), color: "#D862F6" },
      ];

      setDesktopOS(data);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل البيانات.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Adjust chart properties based on screen size
  const chartSize = isSmallScreen ? 120 : 200; // Smaller for small screens
  const cx = isSmallScreen ? 120 : 200;
  const cy = isSmallScreen ? 60 : 100;
  const innerRadius = isSmallScreen ? 40 : 70;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <PieChart
          series={[
            {
              data: desktopOS,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: innerRadius,
              cornerRadius: 15,
              paddingAngle: 5,
              startAngle: -420,
              cx: cx,
              cy: cy,
              valueFormatter,
            },
          ]}
          sx={{
            '& .MuiChartsLegend-root': {
              display: 'none',
              width: { xs: '44vw', sm: 'auto' },
              height: { xs: '107px', sm: 'auto' },
            },
          }}
          legend={{ display: false }}
          height={chartSize}
          width={isSmallScreen ? 250 : 400} // Smaller width for small screens
        />
      )}

      {/* Legend for the pie chart */}
      {!loading && !error && (
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
          }}
        >
          {desktopOS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                margin: isSmallScreen ? "3px 0" : "0 8px",
                fontSize: isSmallScreen ? "12px" : "14px", // Smaller text for small screens
              }}
            >
              <div
                style={{
                  width: isSmallScreen ? "12px" : "16px",
                  height: isSmallScreen ? "12px" : "16px",
                  backgroundColor: item.color,
                  marginRight: "6px",
                }}
                className="label-text"
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
