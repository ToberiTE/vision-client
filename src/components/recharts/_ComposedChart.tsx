import {
  Area,
  ComposedChart,
  Line,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import React from "react";
import { selectComposedChartFields } from "../../reducers/selectors";
import { CustomLabel, sortChartData } from "./utils";
interface data {
  [key: string]: any[];
}

const _ComposedChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const {
    composedChartData,
    composedChartColorX,
    composedChartColorY,
    composedChartColorZ,
    composedChartSorting,
    composedChartGroupBy,
    composedChartDisplayValues,
  } = useSelector(selectComposedChartFields);

  const [data, setData] = useState(composedChartData);

  const index = composedChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let x = Object.keys(index)[2];
  let y = Object.keys(index)[3];
  let z = Object.keys(index)[4];

  if (composedChartGroupBy && composedChartGroupBy !== "None") {
    date = Object.keys(index)[0];
    x = Object.keys(index)[1];
    y = Object.keys(index)[2];
    z = Object.keys(index)[3];
  }

  const [opacity, setOpacity] = useState<any>({
    x: 0,
    y: 0,
    z: 0,
  });

  const memoizedOpacity = useMemo(() => {
    return opacity;
  }, [opacity]);

  const handleMouseEnter = useCallback(
    (o: any) => {
      const { dataKey } = o;
      setOpacity({
        ...memoizedOpacity,
        [dataKey]: 0,
      });
    },
    [memoizedOpacity]
  );

  const handleMouseLeave = useCallback(
    (o: any) => {
      const { dataKey } = o;
      setOpacity({
        ...memoizedOpacity,
        [dataKey]: 0.8,
      });
    },
    [memoizedOpacity]
  );

  let showLabelX: boolean = true;
  let showLabelY: boolean = true;
  let showLabelZ: boolean = true;
  const hsla = /hsla\([^,]+,\s*[0-9]+%?\s*,\s*[0-9]+%?\s*,\s*0\)/;
  if (hsla.test(composedChartColorX)) {
    showLabelX = false;
  }
  if (hsla.test(composedChartColorY)) {
    showLabelY = false;
  }
  if (hsla.test(composedChartColorZ)) {
    showLabelZ = false;
  }

  useMemo(() => {
    let sortedData = sortChartData(
      composedChartData,
      composedChartSorting,
      composedChartGroupBy
    );
    setData(sortedData);
  }, [composedChartData, composedChartSorting, composedChartGroupBy]);

  return (
    <ResponsiveContainer>
      <ComposedChart data={data.length ? data : composedChartData}>
        <XAxis dataKey={date} />
        <YAxis textAnchor="middle" />
        <CartesianGrid strokeDasharray="1 3" vertical={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
        <Area
          name={z}
          type="monotone"
          dataKey={z}
          stroke={composedChartColorZ}
          strokeOpacity={0}
          fill={composedChartColorZ}
          fillOpacity={memoizedOpacity[x] && memoizedOpacity[y]}
          label={
            showLabelZ &&
            composedChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={z}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[x] && memoizedOpacity[y]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Area
          name={y}
          type="monotone"
          dataKey={y}
          stroke={composedChartColorY}
          strokeOpacity={0}
          fill={composedChartColorY}
          fillOpacity={memoizedOpacity[x] && memoizedOpacity[z]}
          label={
            showLabelY &&
            composedChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={y}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[x] && memoizedOpacity[z]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Line
          type="monotone"
          dot={false}
          dataKey={x}
          stroke={composedChartColorX}
          strokeOpacity={memoizedOpacity[y] && memoizedOpacity[z]}
          label={
            showLabelX &&
            composedChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={x}
                x={x}
                y={y}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[y] && memoizedOpacity[z]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Brush
          fill={theme.palette.background.default}
          stroke={theme.palette.primary.main}
          height={15}
        />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
});

export default _ComposedChart;
