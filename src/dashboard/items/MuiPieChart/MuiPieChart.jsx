// import React, { useEffect, useState } from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { useMediaQuery } from "@mui/material";
// import axios from "axios";
// import "./MuiPieChart.css";

// const normalize = (v, total) => Number.parseFloat(((v / total) * 100).toFixed(2));
// const valueFormatter = (item) => `${item.value}%`;

// export default function MuiPieChart() {
//   const [desktopOS, setDesktopOS] = useState([]);
//   const isSmallScreen = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     // Fetch data from your API
//     axios.get(
//       // '/api/public/dashboard/getCardCounter'
//       'https://app.yallapadel.club/public/dashboard/getCardCounter'
//     )
//       .then((response) => {
//         const { total_users, users, vendors, total_items } = response.data;

//         // Create data structure for the pie chart
//         const data = [
//           {
//             label: 'Users',
//             value: normalize(users, total_users),
//             color: '#3C97F3',
//           },
//           {
//             label: 'Vendors',
//             value: normalize(vendors, total_users),
//             color: '#FF3B30',
//           },
//           {
//             label: 'Items',
//             value: normalize(total_items, total_users),
//             color: '#D862F6',
//           },
//         ];

//         setDesktopOS(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   // Adjust chart properties based on screen size
//   const chartSize = isSmallScreen ? 150 : 200;
//   const cx = isSmallScreen ? 150 : 200;
//   const cy = isSmallScreen ? 70 : 100;
//   const innerRadius = isSmallScreen ? 50 : 70;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         position: "relative",
//         width: "100%",
//       }}
//     >
//       <PieChart
//         series={[
//           {
//             data: desktopOS,
//             highlightScope: { fade: "global", highlight: "item" },
//             faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
//             innerRadius: innerRadius,
//             cornerRadius: 15,
//             paddingAngle: -9,
//             startAngle: -420,
//             cx: cx,
//             cy: cy,
//             valueFormatter,
//           },
//         ]}
//         height={chartSize}
//         width={isSmallScreen ? 300 : 400}
//       />

//       {/* Legend for the pie chart */}
//       <div
//         style={{
//           marginTop: "20px",
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: isSmallScreen ? "wrap" : "nowrap",
//           flexDirection: isSmallScreen ? "column" : "row",
//           alignItems: "center",
//         }}
//       >
//         {desktopOS.map((item) => (
//           <div
//             key={item.label}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               margin: isSmallScreen ? "5px 0" : "0 10px",
//             }}
//           >
//             <div
//               style={{
//                 width: "16px",
//                 height: "16px",
//                 backgroundColor: item.color,
//                 marginRight: "8px",
//               }}
//               className="label-text"
//             />
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // Replace with environment variable if possible
          'https://app.yallapadel.club/public/dashboard/getCardCounter'
        );
        const { total_users, playgrounds, bookings, total_items } = response.data;

        // Create data structure for the pie chart
        const data = [
          {
            label: 'bookings',
            value: normalize(bookings, total_users),
            color: '#3C97F3',
          },
          {
            label: 'playgrounds',
            value: normalize(playgrounds, total_users),
            color: '#FF3B30',
          },
          {
            label: 'Items',
            value: normalize(total_items, total_users),
            color: '#D862F6',
          },
        ];

        setDesktopOS(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Adjust chart properties based on screen size
  const chartSize = isSmallScreen ? 150 : 200;
  const cx = isSmallScreen ? 150 : 200;
  const cy = isSmallScreen ? 70 : 100;
  const innerRadius = isSmallScreen ? 50 : 70;

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
          width={isSmallScreen ? 300 : 400}
        />
      )}

{/* Legend for the pie chart */}
{!loading && !error && (
  <div
    style={{
      marginTop: "20px",
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
          margin: isSmallScreen ? "5px 0" : "0 10px",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: item.color,
            marginRight: "8px",
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
