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
interface data {
  [key: string]: any[];
}

const _AreaChart: React.FC<data> = () => {
  const theme = useTheme();

  const { areaChartData } = useSelector(
    (state: RootState) => state.areaChartData
  );
  const { areaChartColorX } = useSelector(
    (state: RootState) => state.areaChartColorX
  );
  const { areaChartColorY } = useSelector(
    (state: RootState) => state.areaChartColorY
  );
  const { areaChartSorting } = useSelector(
    (state: RootState) => state.areaChartSorting
  );
  const { areaChartFilterStart } = useSelector(
    (state: RootState) => state.areaChartFilterStart
  );
  const { areaChartFilterEnd } = useSelector(
    (state: RootState) => state.areaChartFilterStart
  );
  const { areaChartGroupBy } = useSelector(
    (state: RootState) => state.areaChartGroupBy
  );

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

  const [data, setData] = useState(areaChartData);

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
          fillOpacity={opacity[y]}
        />
        <Area
          name={y}
          type="monotone"
          dataKey={y}
          stroke={areaChartColorY}
          strokeOpacity={0}
          fill={areaChartColorY}
          fillOpacity={opacity[x]}
        />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default _AreaChart;
