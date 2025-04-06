import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "@mui/material";
import {
  selectDashboardFields,
  selectPieChartFields,
} from "../../reducers/selectors";
import { Data, sortChartData } from "./utils";

const _PieChart: FC<Data> = memo(() => {
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
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);

  const index = pieChartData[0] ?? [];
  let date = Object.keys(index)[1];
  let val = Object.keys(index)[2];

  if (pieChartGroupBy && pieChartGroupBy !== "None") {
    date = Object.keys(index)[0];
    val = Object.keys(index)[1];
  }

  const dataToMap = data.length > 0 ? data : pieChartData;

  const legendLayout = data.length > 30;

  const legendStyle = useMemo(() => {
    return {
      height: "80%",
      overflow: "auto",
      width: "fit-content",
      cursor: "pointer",
      paddingRight:
        dashboardLayout === 1 && selectedComponentIds.length > 1 ? "0" : "2rem",
      marginRight:
        dashboardLayout === 0 ||
        toggleComponentFullscreen === "pc" ||
        (dashboardLayout === 1 && selectedComponentIds.length < 2)
          ? "5%"
          : 0,
    };
  }, [dashboardLayout, legendLayout]);

  useMemo(() => {
    const sortedData = sortChartData(
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
  }, [dataToMap, pieChartColor, pieChartLMin, pieChartLMax]);

  const cellStyles = useMemo(() => {
    return dataToMap?.map((_, i) => ({
      opacity:
        hoverIndices.length === 0 || hoverIndices.includes(i) ? "1" : "0.1",
      transition: "opacity 150ms linear",
    }));
  }, [hoverIndices, dataToMap]);

  const legendPayload = useMemo(() => {
    return dataToMap?.map((_, i) => ({
      color: hoverIndices.includes(i)
        ? theme.palette.text.primary
        : cellColors[i],
      value: _[date],
    }));
  }, [dataToMap, cellColors, date, hoverIndices]);

  const pieLegendRef = useRef<any>(undefined);

  const handleClick = useCallback((_: any, i: number, e: React.MouseEvent) => {
    setHoverIndices((prev) => {
      if (e.shiftKey) {
        return prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i];
      } else {
        return [i];
      }
    });
  }, []);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      pieLegendRef.current &&
      !pieLegendRef.current.contains(e.target as Node)
    ) {
      setHoverIndices([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const isLargeData = dataToMap?.length > 100;

  const CustomLegend = useMemo(
    () => (props: any) => {
      const { payload } = props;
      return (
        <div ref={pieLegendRef} style={{ padding: "10px" }}>
          {payload.map((e: any, i: number) => (
            <div
              key={`item-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={(ev) => handleClick(e, i, ev)}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: 100,
                  backgroundColor: e.color,
                  marginRight: "8px",
                }}
              />
              <span>{e.value}</span>
            </div>
          ))}
        </div>
      );
    },
    []
  );

  return (
    <ResponsiveContainer>
      <PieChart style={{ userSelect: "none" }}>
        <Pie
          onMouseEnter={() => setHoverIndices([])}
          isAnimationActive={!isLargeData && !handleClick}
          blendStroke
          dataKey={val ?? []}
          data={data.length > 0 ? data : pieChartData}
          label={({ value, percent }) =>
            `${value} (${(percent * 100).toFixed(1)}%)`
          }
        >
          {dataToMap?.map((_, i) => (
            <Cell key={i} fill={cellColors[i]} style={cellStyles[i]} />
          ))}
        </Pie>
        <Legend
          content={CustomLegend}
          wrapperStyle={legendLayout ? legendStyle : undefined}
          layout={legendLayout ? "vertical" : "horizontal"}
          align={legendLayout ? "right" : "center"}
          verticalAlign={legendLayout ? "middle" : "bottom"}
          payload={legendPayload}
        />
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
