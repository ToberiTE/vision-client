import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import React from "react";

interface data {
  [key: string]: any[];
}

const _LineChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();
  const { lineChartData } = useSelector(
    (state: RootState) => state.lineChartData
  );
  const [data, setData] = useState(lineChartData);

  const { lineChartColorX } = useSelector(
    (state: RootState) => state.lineChartColorX
  );
  const { lineChartColorY } = useSelector(
    (state: RootState) => state.lineChartColorY
  );
  const { lineChartSorting } = useSelector(
    (state: RootState) => state.lineChartSorting
  );
  const { lineChartFilterStart } = useSelector(
    (state: RootState) => state.lineChartFilterStart
  );
  const { lineChartFilterEnd } = useSelector(
    (state: RootState) => state.lineChartFilterEnd
  );
  const { lineChartGroupBy } = useSelector(
    (state: RootState) => state.lineChartGroupBy
  );

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

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;

    setOpacity({
      ...opacity,
      [dataKey]: 0,
    });
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;

    setOpacity({
      ...opacity,
      [dataKey]: 0.8,
    });
  };

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
        <Line
          type="monotone"
          dataKey={x}
          stroke={lineChartColorX}
          strokeOpacity={opacity[y]}
        />
        <Line
          type="monotone"
          dataKey={y}
          stroke={lineChartColorY}
          strokeOpacity={opacity[x]}
        />
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
      </LineChart>
    </ResponsiveContainer>
  );
});

export default _LineChart;
