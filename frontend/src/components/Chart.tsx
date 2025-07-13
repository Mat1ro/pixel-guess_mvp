import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: number[];
  isBlurred?: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, isBlurred = false }) => {
  // Преобразуем данные для Recharts
  const chartData = data.map((value, index) => ({
    index,
    price: value,
  }));

  return (
    <div className={`chart-container ${isBlurred ? "blurred" : ""}`}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="index"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
            domain={["dataMin - 10", "dataMax + 10"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00ff88"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#00ff88" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
