import React, { PureComponent } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default class DashLineChart extends PureComponent {
  // state = {
  //   data: [],
  //   error: null,
  // };

  // componentDidMount() {
  //   this.fetchData();
  // }

  // fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       // `/api/public/dashboard/getRevenue`
  //       `https://app.yallapadel.club/public/dashboard/getRevenue`
  //       );
  //     const { total_revenue, total_pending, total_complete, total_cancel } = response.data;

  //     // Transform data for the chart
  //     const data = [
  //       { name: "Revenue", value: total_revenue },
  //       { name: "Pending", value: total_pending },
  //       { name: "Complete", value: total_complete },
  //       { name: "Cancelled", value: total_cancel },
  //     ];

  //     this.setState({ data });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     this.setState({ error: "Failed to load data." });
  //   }
  // };

  // render() {
  //   const { data, error } = this.state;
  state = {
    data: [
      { name: "Revenue", value: 10000 }, // إيرادات
      { name: "Pending", value: 2000 },  // المعلق
      { name: "Complete", value: 7000 }, // المكتمل
      { name: "Cancelled", value: 1000 }, // الملغي
    ],
    error: null,
  };

  render() {
    const { data, error } = this.state;
    return (
      <div style={{ width: "100%", height: "300px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderRadius: "10px",
                border: "1px solid #fff",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3C97F3"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
