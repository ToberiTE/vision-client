import {
  ComposedChart,
  Line,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { selectComposedChartFields } from "../../reducers/selectors";
import { CustomLabel, Data, sortChartData } from "../recharts/utils";

const _ComposedChart: FC<Data> = memo(() => {
  const theme = useTheme();
  const {
    composedChartData,
    composedChartColorX,
    composedChartColorY,
    composedChartColorZ,
    composedChartSorting,
    composedChartGroupBy,
    composedChartDisplayValues,
    isForecastData,
  } = useSelector(selectComposedChartFields);

  const [data, setData] = useState(composedChartData);

  const index = composedChartData[0] ?? [];
  let date: string = "";
  let revenueAvg: string = "";
  let revenueMin: string = "";
  let revenueMax: string = "";
  let revenue: string = "";
  let expenses: string = "";
  let net_income: string = "";

  if (isForecastData) {
    date = Object.keys(index)[0];
    revenueAvg = Object.keys(index)[1];
    revenueMin = Object.keys(index)[2];
    revenueMax = Object.keys(index)[3];
  } else {
    date = Object.keys(index)[1];
    revenue = Object.keys(index)[2];
    expenses = Object.keys(index)[3];
    net_income = Object.keys(index)[4];
  }

  if (
    composedChartGroupBy &&
    composedChartGroupBy !== "None" &&
    !isForecastData
  ) {
    date = Object.keys(index)[0];
    revenue = Object.keys(index)[1];
    expenses = Object.keys(index)[2];
    net_income = Object.keys(index)[3];
  }

  const [opacity, setOpacity] = useState<any>({
    expenses: 1,
    revenue: 1,
    net_income: 1,
    revenueAvg: 1,
    revenueMin: 1,
    revenueMax: 1,
  });

  const memoizedOpacity = useMemo(() => {
    return opacity;
  }, [opacity]);

  const composedLegendRef = useRef<any>(undefined);

  const handleClick = useCallback((o: any) => {
    const { dataKey } = o;
    setOpacity({
      ...memoizedOpacity,
      [dataKey]: 0.1,
    });
  }, []);

  const handleOutsideClick = useCallback((o: any) => {
    if (composedLegendRef.current) {
      const { dataKey } = o;
      setOpacity({
        ...memoizedOpacity,
        [dataKey]: 1,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  let showLabelRevenue: boolean = true;
  let showLabelExpenses: boolean = true;
  let showLabelNetIncome: boolean = true;
  let showLabelRevenueMax: boolean = true;
  let showLabelRevenueAvg: boolean = true;
  let showLabelRevenueMin: boolean = true;

  const hsla = /hsla\([^,]+,\s*[0-9]+%?\s*,\s*[0-9]+%?\s*,\s*0\)/;
  if (hsla.test(composedChartColorX)) {
    showLabelRevenue = false;
    showLabelRevenueMax = false;
  }
  if (hsla.test(composedChartColorY)) {
    showLabelExpenses = false;
    showLabelRevenueAvg = false;
  }
  if (hsla.test(composedChartColorZ)) {
    showLabelNetIncome = false;
    showLabelRevenueMin = false;
  }

  useMemo(() => {
    let sortedData = sortChartData(
      composedChartData,
      composedChartSorting,
      composedChartGroupBy
    );
    setData(sortedData);
  }, [composedChartData, composedChartSorting, composedChartGroupBy]);

  return (
    <ResponsiveContainer>
      <ComposedChart data={data.length ? data : composedChartData}>
        <XAxis dataKey={date} />
        <YAxis textAnchor="middle" />
        <CartesianGrid strokeDasharray="1 3" vertical={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
        {isForecastData && (
          <>
            <Line
              name={
                (
                  <span>
                    Revenue<sub>max</sub>
                  </span>
                ) as any
              }
              dataKey={revenueMax}
              dot={false}
              stroke={composedChartColorX}
              opacity={
                memoizedOpacity[revenueAvg] && memoizedOpacity[revenueMin]
              }
              label={
                showLabelRevenueMax &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={revenueMax}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[revenueAvg] && memoizedOpacity[revenueMin]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
            <Line
              name={
                (
                  <span>
                    Revenue<sub>avg</sub>
                  </span>
                ) as any
              }
              dataKey={revenueAvg}
              dot={false}
              stroke={composedChartColorY}
              opacity={
                memoizedOpacity[revenueMax] && memoizedOpacity[revenueMin]
              }
              label={
                showLabelRevenueAvg &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={revenueAvg}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[revenueMax] && memoizedOpacity[revenueMin]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
            <Line
              name={
                (
                  <span>
                    Revenue<sub>min</sub>
                  </span>
                ) as any
              }
              dataKey={revenueMin}
              dot={false}
              stroke={composedChartColorZ}
              opacity={
                memoizedOpacity[revenueMax] && memoizedOpacity[revenueAvg]
              }
              label={
                showLabelRevenueMin &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={revenueMin}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[revenueMax] && memoizedOpacity[revenueAvg]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
          </>
        )}
        {!isForecastData && (
          <>
            <Line
              type="monotone"
              dot={false}
              dataKey={net_income}
              stroke={composedChartColorZ}
              strokeOpacity={
                memoizedOpacity[revenue] && memoizedOpacity[expenses]
              }
              label={
                showLabelNetIncome &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={net_income}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[revenue] && memoizedOpacity[expenses]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
            <Line
              type="monotone"
              dot={false}
              dataKey={expenses}
              stroke={composedChartColorY}
              strokeOpacity={
                memoizedOpacity[revenue] && memoizedOpacity[net_income]
              }
              label={
                showLabelExpenses &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={expenses}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[revenue] && memoizedOpacity[net_income]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
            <Line
              type="monotone"
              dot={false}
              dataKey={revenue}
              stroke={composedChartColorX}
              strokeOpacity={
                memoizedOpacity[expenses] && memoizedOpacity[net_income]
              }
              label={
                showLabelRevenue &&
                composedChartDisplayValues && (
                  <CustomLabel
                    textAnchor="middle"
                    value={revenue}
                    fill={theme.palette.text.primary}
                    opacity={
                      memoizedOpacity[expenses] && memoizedOpacity[net_income]
                    }
                    writingMode={
                      data.length > 20 ? "vertical-rl" : "horizontal"
                    }
                  />
                )
              }
            />
          </>
        )}
        <Brush
          fill={theme.palette.background.default}
          stroke={theme.palette.primary.main}
          height={15}
        />
        <Legend onClick={handleClick} ref={composedLegendRef} />
      </ComposedChart>
    </ResponsiveContainer>
  );
});

export default _ComposedChart;
