import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Brush,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import React from "react";
import { customLabel } from "./utils";

interface data {
  [key: string]: any[];
}

const _LineChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const selector = useSelector((state: RootState) => state._lineChartReducer);

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.lineChartData,
      selector.lineChartColorX,
      selector.lineChartColorY,
      selector.lineChartSorting,
      selector.lineChartFilterStart,
      selector.lineChartFilterEnd,
      selector.lineChartGroupBy,
    ]
  );

  const {
    lineChartData,
    lineChartColorX,
    lineChartColorY,
    lineChartSorting,
    lineChartFilterStart,
    lineChartFilterEnd,
    lineChartGroupBy,
  } = memoizedSelector;

  const [data, setData] = useState(lineChartData);

  const index = lineChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let x = Object.keys(index)[2];
  let y = Object.keys(index)[3];

  if (lineChartGroupBy && lineChartGroupBy !== "None") {
    date = Object.keys(index)[0];
    x = Object.keys(index)[1];
    y = Object.keys(index)[2];
  }

  const [opacity, setOpacity] = useState<any>({
    x: 0,
    y: 0,
  });

  const memoizedOpacity = useMemo(() => {
    return opacity;
  }, [opacity]);

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;

    setOpacity({
      ...memoizedOpacity,
      [dataKey]: 0,
    });
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;

    setOpacity({
      ...memoizedOpacity,
      [dataKey]: 0.8,
    });
  };

  const CustomLabel = useMemo(() => customLabel, []);

  useMemo(() => {
    let arrayData = Object.values(lineChartData);

    if (lineChartFilterStart || lineChartFilterEnd) {
      arrayData = arrayData.filter((entry) => {
        if (lineChartFilterStart && entry.date < lineChartFilterStart)
          return false;
        if (lineChartFilterEnd && entry.date > lineChartFilterEnd) return false;
        return true;
      });
    }
    arrayData.sort((a, b) => {
      if (lineChartSorting) {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      } else {
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      }
    });

    setData(arrayData);
  }, [
    lineChartData,
    lineChartSorting,
    lineChartFilterStart,
    lineChartFilterEnd,
  ]);
  return (
    <ResponsiveContainer>
      <LineChart data={data.length ? data : lineChartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={date} />
        <YAxis />
        <Line
          type="monotone"
          dot={false}
          dataKey={x}
          stroke={lineChartColorX}
          strokeOpacity={memoizedOpacity[y]}
          label={
            <CustomLabel
              x={x}
              y={y}
              textAnchor="middle"
              writingMode=""
              value={x}
              fill={lineChartColorX}
              opacity={memoizedOpacity[y]}
            />
          }
        />
        <Line
          type="monotone"
          dot={false}
          dataKey={y}
          stroke={lineChartColorY}
          strokeOpacity={memoizedOpacity[x]}
          label={
            <CustomLabel
              x={x}
              y={y}
              textAnchor="middle"
              writingMode=""
              value={y}
              fill={lineChartColorY}
              opacity={memoizedOpacity[x]}
            />
          }
        />
        <Brush dataKey={date} stroke={theme.palette.primary.main} height={20} />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default _LineChart;
