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
import { selectRadarChartFields } from "../../reducers/selectors";
import { FC, memo } from "react";
import { Data } from "./utils";

const _RadarChart: FC<Data> = memo(() => {
  const { radarChartData, radarChartSelectedTable, radarChartColor } =
    useSelector(selectRadarChartFields);

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
          name={radarChartSelectedTable}
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
