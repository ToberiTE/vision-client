import React from "react";

interface LabelProps {
  value?: string;
  fill?: string;
  x?: any;
  y?: any;
  textAnchor?: string;
  opacity?: number;
  writingMode?: string;
}

const CustomLabel = React.memo(
  ({
    value,
    fill,
    x,
    y,
    textAnchor,
    opacity,
    writingMode,
  }: LabelProps): JSX.Element => {
    return (
      <text
        fill={fill}
        x={x}
        y={y}
        textAnchor={textAnchor}
        opacity={opacity}
        writingMode={writingMode}
        fontSize={12}
        pointerEvents={"none"}
      >
        {value}
      </text>
    );
  }
);

const sortChartData = (data: any[], sorting: boolean, groupBy: string) => {
  let arrayData = Object.values(data);

  arrayData.sort((a: any, b: any) => {
    let dateA = a.date;
    let dateB = b.date;

    if (groupBy === "Week") {
      let splitA = a.date.split("W");
      let splitB = b.date.split("W");
      dateA = parseInt(splitA[0]) * 100 + parseInt(splitA[1]);
      dateB = parseInt(splitB[0]) * 100 + parseInt(splitB[1]);
    }

    if (sorting) {
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    } else {
      return dateB > dateA ? 1 : dateB < dateA ? -1 : 0;
    }
  });
  return arrayData;
};

export { CustomLabel, sortChartData };
