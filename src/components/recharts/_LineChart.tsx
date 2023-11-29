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
import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import React from "react";
import { CustomLabel, sortChartData } from "./utils";
import { selectLineChartFields } from "../../reducers/selectors";

interface data {
  [key: string]: any[];
}

const _LineChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const {
    lineChartData,
    lineChartColorX,
    lineChartColorY,
    lineChartSorting,
    lineChartGroupBy,
    lineChartDisplayValues,
  } = useSelector(selectLineChartFields);

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

  let showLabelX: boolean = true;
  let showLabelY: boolean = true;
  const hsla = /hsla\([^,]+,\s*[0-9]+%?\s*,\s*[0-9]+%?\s*,\s*0\)/;
  if (hsla.test(lineChartColorX)) {
    showLabelY = false;
  }
  if (hsla.test(lineChartColorY)) {
    showLabelX = false;
  }

  useMemo(() => {
    let sortedData = sortChartData(
      lineChartData,
      lineChartSorting,
      lineChartGroupBy
    );
    setData(sortedData);
  }, [lineChartData, lineChartSorting, lineChartGroupBy]);

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
            showLabelY &&
            lineChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={x}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[y]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Line
          type="monotone"
          dot={false}
          dataKey={y}
          stroke={lineChartColorY}
          strokeOpacity={memoizedOpacity[x]}
          label={
            showLabelX &&
            lineChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={x}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[x]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Brush
          dataKey={date}
          fill={theme.palette.background.default}
          height={15}
        />
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
