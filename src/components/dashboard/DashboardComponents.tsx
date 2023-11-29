import {
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  OutlinedInput,
  MenuItem,
  debounce,
  SxProps,
} from "@mui/material";
import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ValuesIcon from "@mui/icons-material/Pin";
import { HslaStringColorPicker } from "react-colorful";
import _AreaChart from "../recharts/_AreaChart";
import _BarChart from "../recharts/_BarChart";
import _LineChart from "../recharts/_LineChart";
import _PieChart from "../recharts/_PieChart";
import _RadarChart from "../recharts/_RadarChart";
import _ScatterChart from "../recharts/_ScatterChart";

export interface Component {
  id: string;
  label: string;
  component: JSX.Element;
}

interface ColorPickerProps {
  label: string;
  labelId: string;
  color: string;
  onChange: (color: string) => void;
}

interface FlexBetweenProps {
  sx?: SxProps;
  children: JSX.Element[];
}

interface IconProps {
  onClick: () => void;
}

const components: Component[] = [
  {
    id: "sc",
    label: "Scatter Chart",
    component: <_ScatterChart />,
  },
  {
    id: "ac",
    label: "Area Chart",
    component: <_AreaChart />,
  },
  {
    id: "lc",
    label: "Line Chart",
    component: <_LineChart />,
  },
  {
    id: "bc",
    label: "Bar Chart",
    component: <_BarChart />,
  },
  {
    id: "rc",
    label: "Radar Chart",
    component: <_RadarChart />,
  },
  {
    id: "pc",
    label: "Pie Chart",
    component: <_PieChart />,
  },
];

const SortDescIcon = React.memo(({ onClick }: IconProps): JSX.Element => {
  return (
    <IconButton
      title={"Sort by date: Descending"}
      sx={{
        ml: "0.5rem",
        transform: "rotateX(180deg)",
      }}
      onClick={onClick}
    >
      <SortIcon />
    </IconButton>
  );
});

const SortAscIcon = React.memo(({ onClick }: IconProps): JSX.Element => {
  return (
    <IconButton
      title={"Sort by date: Ascending"}
      sx={{
        ml: "0.5rem",
        transform: "rotateX(0)",
      }}
      onClick={onClick}
    >
      <SortIcon />
    </IconButton>
  );
});

const ColorPicker = React.memo(
  ({ color, onChange, label, labelId }: ColorPickerProps): JSX.Element => {
    return (
      <FormControl>
        <InputLabel aria-invalid id={labelId}>
          {label}
        </InputLabel>
        <Select
          value={color ?? ""}
          renderValue={() => (
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              justifyContent="space-between"
            >
              <Typography sx={{ font: "inherit" }}>{color}</Typography>
              <Box
                sx={{
                  backgroundColor: color,
                  width: "25%",
                  height: "2rem",
                  borderRadius: "0.2rem",
                  mr: "0.5rem",
                }}
              ></Box>
            </Box>
          )}
          labelId={labelId}
          input={<OutlinedInput label={label} />}
        >
          <MenuItem value={color} sx={{ display: "none" }} />
          <HslaStringColorPicker
            style={{
              width: "19.5rem",
              padding: "0.5rem 1rem 0rem 1rem",
            }}
            color={color}
            onChange={debounce(onChange, 200)}
          />
        </Select>
      </FormControl>
    );
  }
);

const FlexBetween = React.memo(
  ({ sx, children }: FlexBetweenProps): JSX.Element => {
    return (
      <Box
        sx={sx}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {children}
      </Box>
    );
  }
);

const ControlsHide = React.memo(({ onClick }: IconProps): JSX.Element => {
  return (
    <IconButton title={"Hide controls"} onClick={onClick}>
      <VisibilityOffIcon />
    </IconButton>
  );
});

const ControlsShow = React.memo(({ onClick }: IconProps): JSX.Element => {
  return (
    <IconButton title={"Show controls"} onClick={onClick}>
      <VisibilityIcon style={{ opacity: "0.25" }} />
    </IconButton>
  );
});

const ToggleChartValues = React.memo(({ onClick }: IconProps): JSX.Element => {
  return (
    <IconButton title={"Toggle chart values"} onClick={onClick}>
      <ValuesIcon />
    </IconButton>
  );
});

const groupByOpt: string[] = ["None", "Year", "Quarter", "Month", "Week"];

export {
  components,
  SortDescIcon,
  SortAscIcon,
  ColorPicker,
  FlexBetween,
  ControlsHide,
  ControlsShow,
  ToggleChartValues,
  groupByOpt,
};
