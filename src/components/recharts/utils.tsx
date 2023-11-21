interface LabelProps {
  value: string;
  fill: string;
  x: any;
  y: any;
  textAnchor: string;
  opacity: number;
  writingMode: string;
}

const customLabel = ({
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
    >
      {value}
    </text>
  );
};

export { customLabel };
