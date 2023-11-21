import {
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  RadarChart,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { useMemo } from "react";

interface data {
  [key: string]: any[];
}

const _RadarChart: React.FC<data> = React.memo(() => {
  const selector = useSelector((state: RootState) => state._radarChartReducer);

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.radarChartData,
      selector.radarChartSelectedTable,
      selector.radarChartColor,
    ]
  );

  const { radarChartData, radarChartSelectedTable, radarChartColor } =
    memoizedSelector;

  const index = radarChartData[0] ?? [];
  const label = Object.keys(index)[0];
  const value = Object.keys(index)[1];

  return (
    <ResponsiveContainer>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey={label} />
        <PolarRadiusAxis />
        <Radar
          name={radarChartSelectedTable.slice(6)}
          dataKey={value}
          fill={radarChartColor}
          fillOpacity={0.4}
        />

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
});

export default _RadarChart;
