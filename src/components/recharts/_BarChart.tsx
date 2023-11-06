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

interface data {
  [key: string]: any[];
}

const _BarChart: React.FC<data> = () => {
  const theme = useTheme();

  const { barChartData } = useSelector(
    (state: RootState) => state.barChartData
  );
  const { barChartColorX } = useSelector(
    (state: RootState) => state.barChartColorX
  );
  const { barChartColorY } = useSelector(
    (state: RootState) => state.barChartColorY
  );
  const { barChartSorting } = useSelector(
    (state: RootState) => state.barChartSorting
  );
  const { barChartFilterStart } = useSelector(
    (state: RootState) => state.barChartFilterStart
  );
  const { barChartFilterEnd } = useSelector(
    (state: RootState) => state.barChartFilterStart
  );
  const { barChartGroupBy } = useSelector(
    (state: RootState) => state.barChartGroupBy
  );

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

  const [data, setData] = useState(barChartData);

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
        <Bar dataKey={x} fill={barChartColorX} fillOpacity={opacity[y]} />

        <Bar dataKey={y} fill={barChartColorY} fillOpacity={opacity[x]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default _BarChart;
