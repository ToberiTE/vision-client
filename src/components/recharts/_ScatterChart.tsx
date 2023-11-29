import {
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Scatter,
  ResponsiveContainer,
  ScatterChart,
  LabelList,
} from "recharts";
import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import React from "react";
import { selectScatterChartFields } from "../../reducers/selectors";

interface data {
  [key: string]: any[];
}

const _ScatterChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const {
    scatterChartData,
    scatterChartSelectedTable,
    scatterChartColor,
    scatterChartDisplayValues,
  } = useSelector(selectScatterChartFields);

  const index = scatterChartData[0] ?? [];
  const id = Object.keys(index)[0];
  const date = Object.keys(index)[1];
  const x = Object.keys(index)[2];
  const y = Object.keys(index)[3];

  return (
    <ResponsiveContainer>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey={x} type="number" />
        <YAxis dataKey={y} type="number" />
        <Scatter
          name={scatterChartSelectedTable}
          data={scatterChartData}
          fill={scatterChartColor}
        >
          {scatterChartDisplayValues && (
            <LabelList
              style={{ pointerEvents: "none", fontSize: 12 }}
              dataKey={id}
              dy={15}
            />
          )}
        </Scatter>
        <Legend />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    p: "0.1rem 0.75rem",
                  }}
                >
                  <p>{`${payload[0].payload[date]}`}</p>
                  <p>{`${x}: ${payload[0].payload[x]}`}</p>
                  <p>{`${y}: ${payload[0].payload[y]}`}</p>
                </Box>
              );
            }
            return null;
          }}
          cursor={{ strokeDasharray: "1 10" }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
});

export default _ScatterChart;
