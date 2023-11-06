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
import { HslaStringColorPicker } from "react-colorful";
import _AreaChart from "../recharts/_AreaChart";
import _BarChart from "../recharts/_BarChart";
import _BrushBarChart from "../recharts/_BrushBarChart";
import _LineChart from "../recharts/_LineChart";
import _PieChart from "../recharts/_PieChart";
import _RadarChart from "../recharts/_RadarChart";
import _ScatterChart from "../recharts/_ScatterChart";

interface Component {
  id: string;
  label: string;
  component: JSX.Element;
}

interface SortIconProps {
  onClick: () => void;
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

interface ToolbarIconProps {
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
    id: "bbc",
    label: "Brush Bar Chart",
    component: <_BrushBarChart />,
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

const sortDescIcon = ({ onClick }: SortIconProps) => {
  return (
    <IconButton
      title={"Sort by date: Descending"}
      sx={{
        transform: "rotateX(180deg)",
      }}
      onClick={onClick}
    >
      <SortIcon />
    </IconButton>
  );
};

const sortAscIcon = ({ onClick }: SortIconProps) => {
  return (
    <IconButton
      title={"Sort by date: Ascending"}
      sx={{
        transform: "rotateX(0)",
      }}
      onClick={onClick}
    >
      <SortIcon />
    </IconButton>
  );
};

const colorPicker = ({
  color,
  onChange,
  label,
  labelId,
}: ColorPickerProps): JSX.Element => {
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
        <Box>
          <HslaStringColorPicker
            color={color}
            onChange={debounce(onChange, 200)}
          />
        </Box>
      </Select>
    </FormControl>
  );
};

const FlexBetween = React.memo(({ sx, children }: FlexBetweenProps) => {
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
});

const ToolbarHide = React.memo(({ onClick }: ToolbarIconProps) => {
  return (
    <IconButton title={"Hide toolbar"} onClick={onClick}>
      <VisibilityOffIcon />
    </IconButton>
  );
});

const ToolbarShow = React.memo(({ onClick }: ToolbarIconProps) => {
  return (
    <IconButton title={"Show toolbar"} onClick={onClick}>
      <VisibilityIcon />
    </IconButton>
  );
});

const groupByOpt: string[] = ["None", "Year", "Quarter", "Month", "Week"];

export {
  components,
  sortDescIcon,
  sortAscIcon,
  colorPicker,
  FlexBetween,
  ToolbarHide,
  ToolbarShow,
  groupByOpt,
};
