import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartComponentProps {
  data: { timestamp: string; value: number }[];
  title: string | null;
}

export default function ({ data, title } : AreaChartComponentProps) {
  return (
    <ResponsiveContainer width="70%" height={400}>
      <AreaChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};