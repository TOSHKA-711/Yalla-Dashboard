import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle, Cell } from 'recharts';

const data = [
  { name: 'premium', pv: 2400 },
  { name: 'Merchant yearly sub', pv: 1398 },
  { name: 'Merchant half-yearly sub', pv: 9800 },
  { name: 'Cars Shows yearly sub', pv: 3908 },
  { name: 'Cars Shows half-yearly sub', pv: 4800 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f'];

export default class SimpleBarChart3 extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
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
          <Bar dataKey="pv" shape={<Rectangle radius={[7, 7, 0, 0]} />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
