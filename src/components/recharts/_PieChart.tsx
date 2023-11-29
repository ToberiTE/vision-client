import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
  Brush,
} from "recharts";
import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import React from "react";
import {
  selectDashboardFields,
  selectPieChartFields,
} from "../../reducers/selectors";
import { sortChartData } from "./utils";

interface data {
  [key: string]: any[];
}

const _PieChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const { dashboardLayout, selectedComponentIds, toggleComponentFullscreen } =
    useSelector(selectDashboardFields);

  const {
    pieChartData,
    pieChartColor,
    pieChartLMin,
    pieChartLMax,
    pieChartSorting,
    pieChartGroupBy,
  } = useSelector(selectPieChartFields);

  const [data, setData] = useState(pieChartData);
  const [hoverIndex, setHoverIndex] = useState<any>(null);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  const index = pieChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let val = Object.keys(index)[2];

  if (pieChartGroupBy && pieChartGroupBy !== "None") {
    date = Object.keys(index)[0];
    val = Object.keys(index)[1];
  }

  let dataToMap;
  data.length > 0 ? (dataToMap = data) : pieChartData;

  let legendLayout: boolean = data.length > 30 ? true : false;

  const legendStyle = {
    height: "80%",
    overflow: "auto",
    width: "fit-content",
    paddingRight:
      dashboardLayout === 1 && selectedComponentIds.length > 1 ? "0" : "2rem",
    marginRight:
      dashboardLayout === 0 ||
      toggleComponentFullscreen === "pc" ||
      (dashboardLayout === 1 && selectedComponentIds.length < 2)
        ? "5%"
        : 0,
  };

  useMemo(() => {
    let sortedData = sortChartData(
      pieChartData,
      pieChartSorting,
      pieChartGroupBy
    );
    setData(sortedData);
  }, [pieChartData, pieChartSorting, pieChartGroupBy]);

  const cellColors = useMemo(() => {
    const shades = [];
    const hslaString = pieChartColor.match(
      /hsla\((\d+), (\d+)%, (\d+)%, (\d+)/
    ) ?? [pieChartColor];

    const [_, h, s, l, a] = hslaString.map((v) => parseInt(v));
    const numShades = pieChartData.length;

    for (let i = 0; i < numShades; i++) {
      const lightness = l - i * ((pieChartLMax - pieChartLMin) / numShades);
      const shadeColor = `hsla(${h}, ${s}%, ${lightness}%, ${a})`;
      shades.push(shadeColor);
    }
    return shades;
  }, [
    pieChartData,
    pieChartColor,
    pieChartLMin,
    pieChartLMax,
    pieChartSorting,
    pieChartGroupBy,
  ]);

  const handleMouseEnter = useCallback((_: any, i: any) => {
    setShouldAnimate(false);
    setHoverIndex(i + 1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  useMemo(() => {
    setShouldAnimate(true);
  }, [pieChartData]);

  return (
    <ResponsiveContainer>
      <PieChart>
        <Brush
          dataKey={date}
          fill={theme.palette.background.paper}
          height={15}
        />
        <Pie
          isAnimationActive={shouldAnimate}
          blendStroke
          dataKey={val ?? []}
          data={data.length > 0 ? data : pieChartData}
          label={({ value, percent }) =>
            `${value} (${(percent * 100).toFixed(1)}%)`
          }
        >
          {dataToMap?.map((_, i) => (
            <Cell
              stroke="#ccc"
              key={i}
              fill={cellColors[i]}
              style={{
                fontSize: "15px",
                fontWeight: "light",
                opacity: !hoverIndex
                  ? "1"
                  : "0.1" && i === hoverIndex - 1
                  ? "1"
                  : "0.1",
                transition: "opacity 250ms ease-in-out",
              }}
            />
          ))}
        </Pie>
        <Legend
          align={legendLayout ? "right" : "center"}
          wrapperStyle={legendLayout ? legendStyle : undefined}
          payload={dataToMap?.map((_, i) => ({
            color: cellColors[i],
            value: _[date],
          }))}
          layout={legendLayout ? "vertical" : "horizontal"}
          verticalAlign={legendLayout ? "middle" : "bottom"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></Legend>
        <Tooltip
          itemStyle={{ color: "inherit" }}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

export default _PieChart;
