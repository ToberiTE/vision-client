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

interface data {
  [key: string]: any[];
}

const _BrushBarChart: React.FC<data> = () => {
  const theme = useTheme();

  const { brushBarChartData } = useSelector(
    (state: RootState) => state.brushBarChartData
  );
  const { brushBarChartColorX } = useSelector(
    (state: RootState) => state.brushBarChartColorX
  );
  const { brushBarChartColorY } = useSelector(
    (state: RootState) => state.brushBarChartColorY
  );
  const { brushBarChartSorting } = useSelector(
    (state: RootState) => state.brushBarChartSorting
  );
  const { brushBarChartFilterStart } = useSelector(
    (state: RootState) => state.brushBarChartFilterStart
  );
  const { brushBarChartFilterEnd } = useSelector(
    (state: RootState) => state.brushBarChartFilterEnd
  );
  const { brushBarChartGroupBy } = useSelector(
    (state: RootState) => state.brushBarChartGroupBy
  );

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

  const [data, setData] = useState(brushBarChartData);

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
        <Legend
          verticalAlign="top"
          wrapperStyle={{ lineHeight: "40px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <ReferenceLine y={0} stroke={theme.palette.primary.main} />
        <Brush dataKey={date} height={30} stroke={theme.palette.primary.main} />
        <Bar dataKey={x} fill={brushBarChartColorX} fillOpacity={opacity[y]} />
        <Bar dataKey={y} fill={brushBarChartColorY} fillOpacity={opacity[x]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default _BrushBarChart;
