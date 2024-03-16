import {
  Area,
  AreaChart,
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
import { selectAreaChartFields } from "../../reducers/selectors";
import { CustomLabel, sortChartData } from "./utils";
interface data {
  [key: string]: any[];
}

const _AreaChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const {
    areaChartData,
    areaChartColorX,
    areaChartColorY,
    areaChartSorting,
    areaChartGroupBy,
    areaChartDisplayValues,
  } = useSelector(selectAreaChartFields);

  const [data, setData] = useState(areaChartData);

  const index = areaChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let x = Object.keys(index)[2];
  let y = Object.keys(index)[3];

  if (areaChartGroupBy && areaChartGroupBy !== "None") {
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
  const hsla = /hsla\([^,]+,\s*[0-9]+%?\s*,\s*[0-9]+%?\s*,\s*0\)/;
  if (hsla.test(areaChartColorX)) {
    showLabelY = false;
  }
  if (hsla.test(areaChartColorY)) {
    showLabelX = false;
  }

  useMemo(() => {
    let sortedData = sortChartData(
      areaChartData,
      areaChartSorting,
      areaChartGroupBy
    );
    setData(sortedData);
  }, [areaChartData, areaChartSorting, areaChartGroupBy]);

  return (
    <ResponsiveContainer>
      <AreaChart data={data.length ? data : areaChartData}>
        <XAxis dataKey={date} />
        <YAxis />
        <CartesianGrid strokeDasharray="1 3" vertical={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
        <Area
          name={x}
          type="monotone"
          dataKey={x}
          stroke={areaChartColorX}
          strokeOpacity={0}
          fill={areaChartColorX}
          fillOpacity={memoizedOpacity[y]}
          label={
            showLabelY &&
            areaChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={x}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[y]}
                writingMode={data.length > 20 ? "vertical-rl" : "horizontal"}
              />
            )
          }
        />
        <Area
          name={y}
          type="monotone"
          dataKey={y}
          stroke={areaChartColorY}
          strokeOpacity={0}
          fill={areaChartColorY}
          fillOpacity={memoizedOpacity[x]}
          label={
            showLabelX &&
            areaChartDisplayValues && (
              <CustomLabel
                textAnchor="middle"
                value={x}
                fill={theme.palette.text.primary}
                opacity={memoizedOpacity[x]}
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
      </AreaChart>
    </ResponsiveContainer>
  );
});

export default _AreaChart;
