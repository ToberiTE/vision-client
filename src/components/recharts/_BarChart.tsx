import {
  BarChart,
  Bar,
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

interface data {
  [key: string]: any[];
}

const _BarChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const selector = useSelector((state: RootState) => state._barChartReducer);

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.barChartData,
      selector.barChartColorX,
      selector.barChartColorY,
      selector.barChartSorting,
      selector.barChartFilterStart,
      selector.barChartFilterEnd,
      selector.barChartGroupBy,
    ]
  );

  const {
    barChartData,
    barChartColorX,
    barChartColorY,
    barChartSorting,
    barChartFilterStart,
    barChartFilterEnd,
    barChartGroupBy,
  } = memoizedSelector;

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

  useMemo(() => {
    let arrayData = Object.values(barChartData);

    if (barChartFilterStart || barChartFilterEnd) {
      arrayData = arrayData.filter((entry) => {
        if (barChartFilterStart && entry.date < barChartFilterStart)
          return false;
        if (barChartFilterEnd && entry.date > barChartFilterEnd) return false;
        return true;
      });
    }
    arrayData.sort((a, b) => {
      if (barChartSorting) {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      } else {
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      }
    });

    setData(arrayData);
  }, [barChartData, barChartSorting, barChartFilterStart, barChartFilterEnd]);

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
        />
        <Bar
          dataKey={y}
          fill={barChartColorY}
          fillOpacity={memoizedOpacity[x]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
});

export default _BarChart;
