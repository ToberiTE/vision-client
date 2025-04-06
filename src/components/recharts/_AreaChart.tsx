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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { selectAreaChartFields } from "../../reducers/selectors";
import { CustomLabel, Data, sortChartData } from "./utils";

const _AreaChart: React.FC<Data> = memo(() => {
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

  const areaLegendRef = useRef<any>(undefined);

  const handleClick = useCallback((o: any) => {
    const { dataKey } = o;
    setOpacity({
      ...memoizedOpacity,
      [dataKey]: 0.1,
    });
  }, []);

  const handleOutsideClick = useCallback((o: any) => {
    if (areaLegendRef.current) {
      const { dataKey } = o;
      setOpacity({
        ...memoizedOpacity,
        [dataKey]: 1,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [handleOutsideClick]);

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
        <Legend onClick={handleClick} ref={areaLegendRef} />
      </AreaChart>
    </ResponsiveContainer>
  );
});

export default _AreaChart;
