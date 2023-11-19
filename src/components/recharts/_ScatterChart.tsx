import {
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Scatter,
  ResponsiveContainer,
  ScatterChart,
} from "recharts";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import React from "react";

interface data {
  [key: string]: any[];
}

const _ScatterChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const { scatterChartData } = useSelector(
    (state: RootState) => state.scatterChartData
  );
  const { scatterChartSelectedTable } = useSelector(
    (state: RootState) => state.scatterChartSelectedTable
  );
  const { scatterChartColor } = useSelector(
    (state: RootState) => state.scatterChartColor
  );

  const index = scatterChartData[0] ?? [];
  const x = Object.keys(index)[2];
  const y = Object.keys(index)[3];

  return (
    <ResponsiveContainer>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey={x} type="number" />
        <YAxis dataKey={y} type="number" />
        <Tooltip
          itemStyle={{ color: "inherit" }}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
          cursor={{ strokeDasharray: "1 10" }}
        />
        <Legend />
        <Scatter
          name={scatterChartSelectedTable.slice(8)}
          data={scatterChartData}
          fill={scatterChartColor}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
});

export default _ScatterChart;
