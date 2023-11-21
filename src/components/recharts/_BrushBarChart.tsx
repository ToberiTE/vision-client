import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

const _BrushBarChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const selector = useSelector(
    (state: RootState) => state._brushBarChartReducer
  );

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.brushBarChartData,
      selector.brushBarChartColorX,
      selector.brushBarChartColorY,
      selector.brushBarChartSorting,
      selector.brushBarChartFilterStart,
      selector.brushBarChartFilterEnd,
      selector.brushBarChartGroupBy,
    ]
  );

  const {
    brushBarChartData,
    brushBarChartColorX,
    brushBarChartColorY,
    brushBarChartSorting,
    brushBarChartFilterStart,
    brushBarChartFilterEnd,
    brushBarChartGroupBy,
  } = memoizedSelector;

  const [data, setData] = useState(brushBarChartData);

  const index = brushBarChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let x = Object.keys(index)[2];
  let y = Object.keys(index)[3];

  if (brushBarChartGroupBy && brushBarChartGroupBy !== "None") {
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
    let arrayData = Object.values(brushBarChartData);

    if (brushBarChartFilterStart || brushBarChartFilterEnd) {
      arrayData = arrayData.filter((entry) => {
        if (brushBarChartFilterStart && entry.date < brushBarChartFilterStart)
          return false;
        if (brushBarChartFilterEnd && entry.date > brushBarChartFilterEnd)
          return false;
        return true;
      });
    }
    arrayData.sort((a, b) => {
      if (brushBarChartSorting) {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      } else {
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      }
    });

    setData(arrayData);
  }, [
    brushBarChartData,
    brushBarChartSorting,
    brushBarChartFilterStart,
    brushBarChartFilterEnd,
  ]);

  return (
    <ResponsiveContainer>
      <BarChart data={data.length ? data : brushBarChartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={date} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
        <ReferenceLine y={0} stroke={theme.palette.primary.main} />
        <Bar
          dataKey={x}
          fill={brushBarChartColorX}
          fillOpacity={memoizedOpacity[y]}
          label={
            <CustomLabel
              textAnchor="middle"
              value={x}
              x={x}
              y={y}
              fill={theme.palette.text.primary}
              opacity={memoizedOpacity[y]}
              writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
            />
          }
        />
        <Bar
          dataKey={y}
          fill={brushBarChartColorY}
          fillOpacity={memoizedOpacity[x]}
          label={
            <CustomLabel
              textAnchor="middle"
              value={y}
              x={x}
              y={y}
              fill={theme.palette.text.primary}
              opacity={memoizedOpacity[x]}
              writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
            />
          }
        />
        <Brush dataKey={date} height={20} stroke={theme.palette.primary.main} />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </BarChart>
    </ResponsiveContainer>
  );
});

export default _BrushBarChart;
