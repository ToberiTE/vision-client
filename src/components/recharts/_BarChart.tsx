import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { CustomLabel, sortChartData } from "./utils";
import React from "react";
import { selectBarChartFields } from "../../reducers/selectors";

interface data {
  [key: string]: any[];
}

const _BarChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const {
    barChartData,
    barChartColorX,
    barChartColorY,
    barChartSorting,
    barChartGroupBy,
    barChartDisplayValues,
  } = useSelector(selectBarChartFields);

  const [data, setData] = useState(barChartData);

  const index = barChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let x = Object.keys(index)[2];
  let y = Object.keys(index)[3];

  if (barChartGroupBy && barChartGroupBy !== "None") {
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
  if (hsla.test(barChartColorX)) {
    showLabelY = false;
  }
  if (hsla.test(barChartColorY)) {
    showLabelX = false;
  }

  useMemo(() => {
    let sortedData = sortChartData(
      barChartData,
      barChartSorting,
      barChartGroupBy
    );
    setData(sortedData);
  }, [barChartData, barChartSorting, barChartGroupBy]);

  return (
    <ResponsiveContainer>
      <BarChart data={data.length ? data : barChartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={date} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Bar
          dataKey={x}
          fill={barChartColorX}
          fillOpacity={memoizedOpacity[y]}
          label={
            showLabelY &&
            barChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={y}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[y]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Bar
          dataKey={y}
          fill={barChartColorY}
          fillOpacity={memoizedOpacity[x]}
          label={
            showLabelX &&
            barChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={y}
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
      </BarChart>
    </ResponsiveContainer>
  );
});

export default _BarChart;
