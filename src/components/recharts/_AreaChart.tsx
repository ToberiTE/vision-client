import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import React from "react";
interface data {
  [key: string]: any[];
}

const _AreaChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const selector = useSelector((state: RootState) => state._areaChartReducer);

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.areaChartData,
      selector.areaChartColorX,
      selector.areaChartColorY,
      selector.areaChartSorting,
      selector.areaChartFilterStart,
      selector.areaChartFilterEnd,
      selector.areaChartGroupBy,
    ]
  );

  const {
    areaChartData,
    areaChartColorX,
    areaChartColorY,
    areaChartSorting,
    areaChartFilterStart,
    areaChartFilterEnd,
    areaChartGroupBy,
  } = memoizedSelector;

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

  useMemo(() => {
    let arrayData = Object.values(areaChartData);

    if (areaChartFilterStart || areaChartFilterEnd) {
      arrayData = arrayData.filter((entry) => {
        if (areaChartFilterStart && entry.date < areaChartFilterStart)
          return false;
        if (areaChartFilterEnd && entry.date > areaChartFilterEnd) return false;
        return true;
      });
    }

    arrayData.sort((a, b) => {
      if (areaChartSorting) {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      } else {
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      }
    });

    setData(arrayData);
  }, [
    areaChartData,
    areaChartSorting,
    areaChartFilterStart,
    areaChartFilterEnd,
  ]);

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
        />
        <Area
          name={y}
          type="monotone"
          dataKey={y}
          stroke={areaChartColorY}
          strokeOpacity={0}
          fill={areaChartColorY}
          fillOpacity={memoizedOpacity[x]}
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
