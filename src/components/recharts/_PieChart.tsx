import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import React from "react";

interface data {
  [key: string]: any[];
}

const _PieChart: React.FC<data> = React.memo(() => {
  const theme = useTheme();

  const { dashboardLayout } = useSelector(
    (state: RootState) => state.dashboardReducer
  );

  const selector = useSelector((state: RootState) => state._pieChartReducer);

  const memoizedSelector = useMemo(
    () => selector,
    [
      selector.pieChartData,
      selector.pieChartColor,
      selector.pieChartLMin,
      selector.pieChartLMax,
      selector.pieChartSorting,
      selector.pieChartFilterStart,
      selector.pieChartFilterEnd,
      selector.pieChartGroupBy,
    ]
  );

  const {
    pieChartData,
    pieChartColor,
    pieChartLMin,
    pieChartLMax,
    pieChartSorting,
    pieChartFilterStart,
    pieChartFilterEnd,
    pieChartGroupBy,
  } = memoizedSelector;

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

  let legendLayout: boolean = data.length > 40 ? true : false;

  const legendStyle = {
    height: "80%",
    overflow: "auto",
    width: dashboardLayout === 0 ? "10%" : "fit-content",
    marginRight: dashboardLayout === 0 ? "5%" : 0,
  };

  useMemo(() => {
    let arrayData = Object.values(pieChartData);

    if (pieChartFilterStart || pieChartFilterEnd) {
      arrayData = arrayData.filter((entry) => {
        if (pieChartFilterStart && entry.date < pieChartFilterStart)
          return false;
        if (pieChartFilterEnd && entry.date > pieChartFilterEnd) return false;
        return true;
      });
    }

    arrayData.sort((a, b) => {
      if (pieChartSorting) {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      } else {
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      }
    });

    setData(arrayData);
  }, [pieChartData, pieChartSorting, pieChartFilterStart, pieChartFilterEnd]);

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
    pieChartFilterStart,
    pieChartFilterEnd,
  ]);

  const handleMouseEnter = useCallback((_: any, i: any) => {
    setHoverIndex(i + 1);
    setShouldAnimate(false);
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
