//#region imports
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useMsal } from "@azure/msal-react";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setComponentTables,
  setDashboardLayout,
  setSelectedComponentIds,
} from "../../reducers/dashboardSlice";
import _ScatterChart from "../recharts/_ScatterChart";
import _AreaChart from "../recharts/_AreaChart";
import _LineChart from "../recharts/_LineChart";
import _BarChart from "../recharts/_BarChart";
import _RadarChart from "../recharts/_RadarChart";
import _PieChart from "../recharts/_PieChart";
import _BrushBarChart from "../recharts/_BrushBarChart";
import {
  setScatterChartColor,
  setScatterChartData,
  setScatterChartSelectedTable,
  setScatterChartTitle,
  setScatterChartToolbarVisible,
} from "../../reducers/_scatterChartSlice";
import {
  setAreaChartColorX,
  setAreaChartColorY,
  setAreaChartData,
  setAreaChartSelectedTable,
  setAreaChartSorting,
  setAreaChartTitle,
  setAreaChartFilterStart,
  setAreaChartFilterEnd,
  setAreaChartGroupBy,
  setAreaChartToolbarVisible,
} from "../../reducers/_areaChartSlice";
import {
  setLineChartColorX,
  setLineChartColorY,
  setLineChartData,
  setLineChartSelectedTable,
  setLineChartSorting,
  setLineChartTitle,
  setLineChartFilterStart,
  setLineChartFilterEnd,
  setLineChartGroupBy,
  setLineChartToolbarVisible,
} from "../../reducers/_lineChartSlice";
import {
  setBarChartColorX,
  setBarChartColorY,
  setBarChartData,
  setBarChartSelectedTable,
  setBarChartSorting,
  setBarChartTitle,
  setBarChartFilterStart,
  setBarChartFilterEnd,
  setBarChartGroupBy,
  setBarChartToolbarVisible,
} from "../../reducers/_barChartSlice";
import {
  setBrushBarChartColorX,
  setBrushBarChartColorY,
  setBrushBarChartData,
  setBrushBarChartSelectedTable,
  setBrushBarChartSorting,
  setBrushBarChartTitle,
  setBrushBarChartFilterStart,
  setBrushBarChartFilterEnd,
  setBrushBarChartGroupBy,
  setBrushBarChartToolbarVisible,
} from "../../reducers/_brushBarChartSlice";
import {
  setRadarChartColor,
  setRadarChartData,
  setRadarChartSelectedTable,
  setRadarChartTitle,
  setRadarChartGroupBy,
  setRadarChartToolbarVisible,
} from "../../reducers/_radarChartSlice";
import {
  setPieChartData,
  setPieChartSelectedTable,
  setPieChartTitle,
  setPieChartColor,
  setPieChartLMin,
  setPieChartLMax,
  setPieChartGroupBy,
  setPieChartToolbarVisible,
  setPieChartSorting,
  setPieChartFilterStart,
  setPieChartFilterEnd,
} from "../../reducers/_pieChartSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import React from "react";
import {
  components,
  sortDescIcon,
  sortAscIcon,
  colorPicker,
  FlexBetween,
  ToolbarHide,
  ToolbarShow,
  groupByOpt,
} from "../dashboard/DashboardComponents";
//#endregion

const Dashboard: React.FC = () => {
  //#region hooks
  const theme = useTheme();
  const xlScreen = useMediaQuery(theme.breakpoints.up(2000));
  const lgScreen = useMediaQuery(theme.breakpoints.up(1550));
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const { accounts } = useMsal();
  const name = accounts[0]?.idTokenClaims?.name;
  const [selectedListItems, setSelectedListItems] = useState<string[]>([]);
  const [openComponentSettings, setOpenComponentSettings] =
    useState<string>("");
  const [toggleComponentFullscreen, setToggleComponentFullscreen] =
    useState<string>("");

  useEffect(() => {
    fetchComponentTables();
  }, []);

  const SortDescIcon = useMemo(() => sortDescIcon, []);
  const SortAscIcon = useMemo(() => sortAscIcon, []);
  const ColorPicker = useMemo(() => colorPicker, []);

  const { dashboardLayout } = useSelector(
    (state: RootState) => state.dashboardLayout
  );
  const { selectedComponentIds } = useSelector(
    (state: RootState) => state.selectedComponentIds
  );
  const { componentTables } = useSelector(
    (state: RootState) => state.componentTables
  );
  const { scatterChartSelectedTable } = useSelector(
    (state: RootState) => state.scatterChartSelectedTable
  );
  const { areaChartSelectedTable } = useSelector(
    (state: RootState) => state.areaChartSelectedTable
  );
  const { lineChartSelectedTable } = useSelector(
    (state: RootState) => state.lineChartSelectedTable
  );
  const { barChartSelectedTable } = useSelector(
    (state: RootState) => state.barChartSelectedTable
  );
  const { brushBarChartSelectedTable } = useSelector(
    (state: RootState) => state.brushBarChartSelectedTable
  );
  const { radarChartSelectedTable } = useSelector(
    (state: RootState) => state.radarChartSelectedTable
  );
  const { pieChartSelectedTable } = useSelector(
    (state: RootState) => state.pieChartSelectedTable
  );
  const { scatterChartTitle } = useSelector(
    (state: RootState) => state.scatterChartTitle
  );
  const { areaChartTitle } = useSelector(
    (state: RootState) => state.areaChartTitle
  );
  const { lineChartTitle } = useSelector(
    (state: RootState) => state.lineChartTitle
  );
  const { barChartTitle } = useSelector(
    (state: RootState) => state.barChartTitle
  );
  const { brushBarChartTitle } = useSelector(
    (state: RootState) => state.brushBarChartTitle
  );
  const { radarChartTitle } = useSelector(
    (state: RootState) => state.radarChartTitle
  );
  const { pieChartTitle } = useSelector(
    (state: RootState) => state.pieChartTitle
  );
  const { scatterChartColor } = useSelector(
    (state: RootState) => state.scatterChartColor
  );
  const { areaChartColorX } = useSelector(
    (state: RootState) => state.areaChartColorX
  );
  const { areaChartColorY } = useSelector(
    (state: RootState) => state.areaChartColorY
  );
  const { lineChartColorX } = useSelector(
    (state: RootState) => state.lineChartColorX
  );
  const { lineChartColorY } = useSelector(
    (state: RootState) => state.lineChartColorY
  );
  const { barChartColorX } = useSelector(
    (state: RootState) => state.barChartColorX
  );
  const { barChartColorY } = useSelector(
    (state: RootState) => state.barChartColorY
  );
  const { brushBarChartColorX } = useSelector(
    (state: RootState) => state.brushBarChartColorX
  );
  const { brushBarChartColorY } = useSelector(
    (state: RootState) => state.brushBarChartColorY
  );
  const { radarChartColor } = useSelector(
    (state: RootState) => state.radarChartColor
  );
  const { pieChartColor } = useSelector(
    (state: RootState) => state.pieChartColor
  );
  const { pieChartLMin } = useSelector(
    (state: RootState) => state.pieChartLMin
  );
  const { pieChartLMax } = useSelector(
    (state: RootState) => state.pieChartLMax
  );
  const { areaChartSorting } = useSelector(
    (state: RootState) => state.areaChartSorting
  );
  const { lineChartSorting } = useSelector(
    (state: RootState) => state.lineChartSorting
  );
  const { barChartSorting } = useSelector(
    (state: RootState) => state.barChartSorting
  );
  const { brushBarChartSorting } = useSelector(
    (state: RootState) => state.brushBarChartSorting
  );
  const { pieChartSorting } = useSelector(
    (state: RootState) => state.pieChartSorting
  );
  const { areaChartData } = useSelector(
    (state: RootState) => state.areaChartData
  );
  const { lineChartData } = useSelector(
    (state: RootState) => state.lineChartData
  );
  const { barChartData } = useSelector(
    (state: RootState) => state.barChartData
  );
  const { brushBarChartData } = useSelector(
    (state: RootState) => state.brushBarChartData
  );
  const { pieChartData } = useSelector(
    (state: RootState) => state.pieChartData
  );
  const { areaChartFilterStart } = useSelector(
    (state: RootState) => state.areaChartFilterStart
  );
  const { areaChartFilterEnd } = useSelector(
    (state: RootState) => state.areaChartFilterEnd
  );
  const { lineChartFilterStart } = useSelector(
    (state: RootState) => state.lineChartFilterStart
  );
  const { lineChartFilterEnd } = useSelector(
    (state: RootState) => state.lineChartFilterEnd
  );
  const { barChartFilterStart } = useSelector(
    (state: RootState) => state.barChartFilterStart
  );
  const { barChartFilterEnd } = useSelector(
    (state: RootState) => state.barChartFilterEnd
  );
  const { brushBarChartFilterStart } = useSelector(
    (state: RootState) => state.brushBarChartFilterStart
  );
  const { brushBarChartFilterEnd } = useSelector(
    (state: RootState) => state.brushBarChartFilterEnd
  );
  const { pieChartFilterStart } = useSelector(
    (state: RootState) => state.pieChartFilterStart
  );
  const { pieChartFilterEnd } = useSelector(
    (state: RootState) => state.pieChartFilterEnd
  );
  const { scatterChartToolbarVisible } = useSelector(
    (state: RootState) => state.scatterChartToolbarVisible
  );
  const { areaChartToolbarVisible } = useSelector(
    (state: RootState) => state.areaChartToolbarVisible
  );
  const { lineChartToolbarVisible } = useSelector(
    (state: RootState) => state.lineChartToolbarVisible
  );
  const { barChartToolbarVisible } = useSelector(
    (state: RootState) => state.barChartToolbarVisible
  );
  const { brushBarChartToolbarVisible } = useSelector(
    (state: RootState) => state.brushBarChartToolbarVisible
  );
  const { radarChartToolbarVisible } = useSelector(
    (state: RootState) => state.radarChartToolbarVisible
  );
  const { pieChartToolbarVisible } = useSelector(
    (state: RootState) => state.pieChartToolbarVisible
  );
  const { areaChartGroupBy } = useSelector(
    (state: RootState) => state.areaChartGroupBy
  );
  const { lineChartGroupBy } = useSelector(
    (state: RootState) => state.lineChartGroupBy
  );
  const { barChartGroupBy } = useSelector(
    (state: RootState) => state.barChartGroupBy
  );
  const { brushBarChartGroupBy } = useSelector(
    (state: RootState) => state.brushBarChartGroupBy
  );
  const { radarChartGroupBy } = useSelector(
    (state: RootState) => state.radarChartGroupBy
  );
  const { pieChartGroupBy } = useSelector(
    (state: RootState) => state.pieChartGroupBy
  );
  const areaChartDates = Object.values(areaChartData).map((p) =>
    dayjs(p.date).valueOf()
  );
  const areaChartMinDate = Math.min(...areaChartDates);
  const areaChartMaxDate = Math.max(...areaChartDates);
  const lineChartDates = Object.values(lineChartData).map((p) =>
    dayjs(p.date).valueOf()
  );
  const lineChartMinDate = Math.min(...lineChartDates);
  const lineChartMaxDate = Math.max(...lineChartDates);
  const barChartDates = Object.values(barChartData).map((p) =>
    dayjs(p.date).valueOf()
  );
  const barChartMinDate = Math.min(...barChartDates);
  const barChartMaxDate = Math.max(...barChartDates);
  const brushBarChartDates = Object.values(brushBarChartData).map((p) =>
    dayjs(p.date).valueOf()
  );
  const brushBarChartMinDate = Math.min(...brushBarChartDates);
  const brushBarChartMaxDate = Math.max(...brushBarChartDates);
  const pieChartDates = Object.values(pieChartData).map((p) =>
    dayjs(p.date).valueOf()
  );
  const pieChartMinDate = Math.min(...pieChartDates);
  const pieChartMaxDate = Math.max(...pieChartDates);
  //#endregion

  //#region handlers
  const fetchComponentTables = async (): Promise<void> => {
    const url = new URL("/dashboard/tables", import.meta.env.VITE_BASE_URL);
    const res = await fetch(url.href);
    const data = await res.json();
    dispatch(setComponentTables(data));
  };

  const fetchSelectedTable = async (
    id: string,
    table: string,
    groupBy?: string
  ): Promise<void> => {
    let url = new URL("/selectedTable", import.meta.env.VITE_BASE_URL);
    url.searchParams.append("selectedTable", table);

    if (groupBy && groupBy !== "None") {
      url.searchParams.append("groupBy", groupBy);
    }

    const response = await fetch(url);
    const data = await response.json();
    const component = components.find((c) => c.id === id);
    if (component) {
      switch (id) {
        case "sc":
          dispatch(setScatterChartData(data));
          break;
        case "ac":
          dispatch(setAreaChartData(data));
          break;
        case "lc":
          dispatch(setLineChartData(data));
          break;
        case "bc":
          dispatch(setBarChartData(data));
          break;
        case "bbc":
          dispatch(setBrushBarChartData(data));
          break;
        case "rc":
          dispatch(setRadarChartData(data));
          break;
        case "pc":
          dispatch(setPieChartData(data));
          break;
        default:
          break;
      }
    }
  };

  const handleComponentUpdate = (
    id: string,
    action: any,
    arg0?: any,
    arg1?: any
  ): void => {
    const component = components.find((c) => c.id === id);
    if (component) {
      switch (id) {
        case "sc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setScatterChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setScatterChartTitle(arg0));
              break;
            case "color":
              dispatch(setScatterChartColor(arg0));
              break;
            case "toolbar":
              dispatch(
                setScatterChartToolbarVisible(!scatterChartToolbarVisible)
              );
              break;
          }
          break;
        case "ac":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setAreaChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setAreaChartTitle(arg0));
              break;
            case "color":
              arg0 && dispatch(setAreaChartColorX(arg0));
              arg1 && dispatch(setAreaChartColorY(arg1));
              break;
            case "sort":
              dispatch(setAreaChartSorting(!areaChartSorting));
              break;
            case "filter":
              arg0 &&
                dispatch(
                  setAreaChartFilterStart(
                    dayjs(arg0).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              arg1 &&
                dispatch(
                  setAreaChartFilterEnd(
                    dayjs(arg1).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              break;
            case "toolbar":
              dispatch(setAreaChartToolbarVisible(!areaChartToolbarVisible));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setAreaChartGroupBy(arg1));
              break;
          }
          break;
        case "lc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setLineChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setLineChartTitle(arg0));
              break;
            case "color":
              arg0 && dispatch(setLineChartColorX(arg0));
              arg1 && dispatch(setLineChartColorY(arg1));
              break;
            case "sort":
              dispatch(setLineChartSorting(!lineChartSorting));
              break;
            case "filter":
              arg0 &&
                dispatch(
                  setLineChartFilterStart(
                    dayjs(arg0).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              arg1 &&
                dispatch(
                  setLineChartFilterEnd(
                    dayjs(arg1).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              break;
            case "toolbar":
              dispatch(setLineChartToolbarVisible(!lineChartToolbarVisible));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setLineChartGroupBy(arg1));
              break;
          }
          break;
        case "bc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setBarChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setBarChartTitle(arg0));
              break;
            case "color":
              arg0 && dispatch(setBarChartColorX(arg0));
              arg1 && dispatch(setBarChartColorY(arg1));
              break;
            case "sort":
              dispatch(setBarChartSorting(!barChartSorting));
              break;
            case "filter":
              arg0 &&
                dispatch(
                  setBarChartFilterStart(
                    dayjs(arg0).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              arg1 &&
                dispatch(
                  setBarChartFilterEnd(
                    dayjs(arg1).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              break;
            case "toolbar":
              dispatch(setBarChartToolbarVisible(!barChartToolbarVisible));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setBarChartGroupBy(arg1));
              break;
          }
          break;
        case "bbc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setBrushBarChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setBrushBarChartTitle(arg0));
              break;
            case "color":
              arg0 && dispatch(setBrushBarChartColorX(arg0));
              arg1 && dispatch(setBrushBarChartColorY(arg1));
              break;
            case "sort":
              dispatch(setBrushBarChartSorting(!brushBarChartSorting));
              break;
            case "filter":
              arg0 &&
                dispatch(
                  setBrushBarChartFilterStart(
                    dayjs(arg0).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              arg1 &&
                dispatch(
                  setBrushBarChartFilterEnd(
                    dayjs(arg1).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              break;
            case "toolbar":
              dispatch(
                setBrushBarChartToolbarVisible(!brushBarChartToolbarVisible)
              );
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setBrushBarChartGroupBy(arg1));
              break;
          }
          break;
        case "rc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setRadarChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setRadarChartTitle(arg0));
              break;
            case "color":
              dispatch(setRadarChartColor(arg0));
              break;
            case "toolbar":
              dispatch(setRadarChartToolbarVisible(!radarChartToolbarVisible));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setRadarChartGroupBy(arg1));
              break;
          }
          break;
        case "pc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setPieChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setPieChartTitle(arg0));
              break;
            case "color":
              dispatch(setPieChartColor(arg0));
              break;
            case "lMin":
              dispatch(setPieChartLMin(arg0));
              break;
            case "lMax":
              dispatch(setPieChartLMax(arg0));
              break;
            case "sort":
              dispatch(setPieChartSorting(!pieChartSorting));
              break;
            case "filter":
              arg0 &&
                dispatch(
                  setPieChartFilterStart(
                    dayjs(arg0).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              arg1 &&
                dispatch(
                  setPieChartFilterEnd(
                    dayjs(arg1).format("YYYY-MM-DDTHH:mm:ss")
                  )
                );
              break;
            case "toolbar":
              dispatch(setPieChartToolbarVisible(!pieChartToolbarVisible));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setPieChartGroupBy(arg1));
              break;
          }
          break;
        default:
          break;
      }
    }
  };

  const handleOpenComponentSettings = (id: string): void => {
    setOpenComponentSettings(id);
  };

  const handleToggleComponentFullscreen = (id: string): void => {
    setToggleComponentFullscreen(id);
  };

  const handleLayoutChange = (layout: number): void => {
    dispatch(setDashboardLayout(layout));
  };

  const handleComponentSelection = (componentId: string): void => {
    const newSelectedComponentIds = selectedComponentIds?.includes(componentId)
      ? selectedComponentIds?.filter((id: string) => id !== componentId)
      : [...selectedComponentIds, componentId];
    dispatch(setSelectedComponentIds(newSelectedComponentIds));

    const item = selectedListItems?.includes(componentId)
      ? selectedListItems?.filter((id) => id !== componentId)
      : [...selectedListItems, componentId];
    setSelectedListItems(item);
  };

  const selectedComponents = components?.filter((component): boolean =>
    selectedComponentIds?.includes(component.id)
  );

  //#endregion

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" alignItems="center" gap="2rem" py="0.75rem" pl={4}>
        <FormControl>
          <InputLabel aria-invalid id="c">
            Components
          </InputLabel>
          <Select
            sx={{
              width: "15rem",
              height: "3.5rem",
            }}
            multiple
            labelId="c"
            value={[]}
            input={<OutlinedInput label="Components" />}
          >
            {components.map((component) => (
              <MenuItem
                sx={{ height: "3.5rem" }}
                key={component.id}
                value={component.label}
                onClick={() => handleComponentSelection(component.id)}
              >
                <Checkbox
                  value={component.id}
                  checked={selectedComponentIds?.includes(component.id)}
                />
                <ListItemText primary={component.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedComponents.length > 0 && (
          <Box display="flex" gap="0.5rem">
            <IconButton
              onClick={() => handleLayoutChange(0)}
              color="inherit"
              title="List view"
            >
              <ViewListIcon sx={{ fontSize: "26px" }} />
            </IconButton>
            <IconButton
              onClick={() => handleLayoutChange(1)}
              color="inherit"
              title="Grid view"
            >
              <ViewModuleIcon sx={{ fontSize: "26px" }} />
            </IconButton>
          </Box>
        )}
      </Box>

      {selectedComponents.length > 0 && (
        <Box
          sx={{
            display: "grid",
            height: "100%",
            gridTemplateColumns:
              dashboardLayout === 0 ||
              (dashboardLayout === 1 && selectedComponents.length === 1)
                ? "100%"
                : xlScreen &&
                  dashboardLayout === 1 &&
                  selectedComponents.length >= 2
                ? "1fr 1fr 1fr"
                : lgScreen &&
                  dashboardLayout === 1 &&
                  selectedComponents.length >= 2
                ? "1fr 1fr"
                : "100%",
            gridAutoRows:
              dashboardLayout === 0 ||
              (dashboardLayout === 1 && selectedComponents.length === 1)
                ? "100%"
                : "",
            gridAutoFlow: "dense",
            padding: "1rem 2rem",
            gap:
              dashboardLayout === 0 ||
              (dashboardLayout === 1 && selectedComponents.length === 1)
                ? "5rem"
                : "2rem",
            alignItems: "center",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {selectedComponents.map((component) => (
            <Box
              key={component.id}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "hsl(0,0%,15%)"
                    : "hsl(0,0%,100%)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "10px 10px 20px hsl(0,0%,5%)"
                    : "10px 10px 20px hsl(0,0%,90%)",
                borderRadius:
                  toggleComponentFullscreen === component.id ? "0" : "1rem",
                padding: "1rem",
                pb:
                  toggleComponentFullscreen === component.id
                    ? "4rem"
                    : dashboardLayout === 0 ||
                      (dashboardLayout === 1 && selectedComponents.length === 1)
                    ? "4rem"
                    : "1rem",
                height:
                  toggleComponentFullscreen === component.id ||
                  dashboardLayout === 0 ||
                  (dashboardLayout === 1 && selectedComponents.length === 1)
                    ? "100%"
                    : dashboardLayout === 1 && selectedComponents.length >= 2
                    ? "auto"
                    : "100%",

                minWidth:
                  toggleComponentFullscreen === component.id
                    ? "100%"
                    : dashboardLayout === 0
                    ? "100%"
                    : dashboardLayout === 1 && selectedComponents.length >= 2
                    ? "33%"
                    : toggleComponentFullscreen === component.id
                    ? "100%"
                    : "100%",
                aspectRatio:
                  toggleComponentFullscreen === component.id ||
                  dashboardLayout === 0 ||
                  (dashboardLayout === 1 && selectedComponents.length === 1)
                    ? "100%"
                    : dashboardLayout === 1 && selectedComponents.length >= 2
                    ? "16 / 9"
                    : "16 / 9",
                position:
                  toggleComponentFullscreen === component.id ? "fixed" : "",
                top: toggleComponentFullscreen === component.id ? "0" : "",
                left: toggleComponentFullscreen === component.id ? "0" : "",
                zIndex:
                  toggleComponentFullscreen === component.id ? "999999" : "",
              }}
            >
              <Box
                sx={{
                  display:
                    (component.id === "sc" && scatterChartToolbarVisible) ||
                    (component.id === "ac" && areaChartToolbarVisible) ||
                    (component.id === "lc" && lineChartToolbarVisible) ||
                    (component.id === "bc" && barChartToolbarVisible) ||
                    (component.id === "bbc" && brushBarChartToolbarVisible) ||
                    (component.id === "rc" && radarChartToolbarVisible) ||
                    (component.id === "pc" && pieChartToolbarVisible)
                      ? "none"
                      : "flex",
                  justifyContent: "end",
                  p: "0 0 0.5rem 0.5rem",
                }}
              >
                <ToolbarShow
                  onClick={() => handleComponentUpdate(component.id, "toolbar")}
                />
              </Box>
              <FlexBetween
                sx={{
                  display:
                    (component.id === "sc" && scatterChartToolbarVisible) ||
                    (component.id === "ac" && areaChartToolbarVisible) ||
                    (component.id === "lc" && lineChartToolbarVisible) ||
                    (component.id === "bc" && barChartToolbarVisible) ||
                    (component.id === "bbc" && brushBarChartToolbarVisible) ||
                    (component.id === "rc" && radarChartToolbarVisible) ||
                    (component.id === "pc" && pieChartToolbarVisible)
                      ? "flex"
                      : "none",
                  p: "0 0 0.5rem 0.5rem",
                }}
              >
                <Typography variant="body1">
                  {component.id === "sc"
                    ? scatterChartTitle
                    : component.id === "ac"
                    ? areaChartTitle
                    : component.id === "lc"
                    ? lineChartTitle
                    : component.id === "bc"
                    ? barChartTitle
                    : component.id === "bbc"
                    ? brushBarChartTitle
                    : component.id === "rc"
                    ? radarChartTitle
                    : component.id === "pc"
                    ? pieChartTitle
                    : ""}
                </Typography>
                <Box display="flex">
                  <Box pr={2}>
                    {["ac", "lc", "bc", "bbc", "rc", "pc"].includes(
                      component.id
                    ) && (
                      <FormControl size="small">
                        <InputLabel aria-invalid id="group">
                          Group by
                        </InputLabel>
                        <Select
                          sx={{
                            minWidth: "11rem",
                          }}
                          labelId="group"
                          value={
                            component.id === "ac"
                              ? areaChartGroupBy
                              : component.id === "lc"
                              ? lineChartGroupBy
                              : component.id === "bc"
                              ? barChartGroupBy
                              : component.id === "bbc"
                              ? brushBarChartGroupBy
                              : component.id === "rc"
                              ? radarChartGroupBy
                              : component.id === "pc"
                              ? pieChartGroupBy
                              : ""
                          }
                          input={<OutlinedInput label="Group by" />}
                        >
                          {groupByOpt.map((opt) => (
                            <MenuItem
                              key={opt}
                              value={opt}
                              onClick={() =>
                                handleComponentUpdate(
                                  component.id,
                                  "group",
                                  component.id === "ac"
                                    ? areaChartSelectedTable
                                    : component.id === "lc"
                                    ? lineChartSelectedTable
                                    : component.id === "bc"
                                    ? barChartSelectedTable
                                    : component.id === "bbc"
                                    ? brushBarChartSelectedTable
                                    : component.id === "rc"
                                    ? radarChartSelectedTable
                                    : component.id === "pc"
                                    ? pieChartSelectedTable
                                    : "",
                                  opt
                                )
                              }
                            >
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                  {["ac", "lc", "bc", "bbc", "pc"].includes(component.id) && (
                    <>
                      <Box display="flex" gap={2} pr={2}>
                        <DatePicker
                          label="Start date"
                          slotProps={{
                            textField: { size: "small", error: false },
                          }}
                          disableHighlightToday
                          views={["year", "month", "day"]}
                          value={
                            component.id === "ac"
                              ? dayjs(areaChartFilterStart)
                              : component.id === "lc"
                              ? dayjs(lineChartFilterStart)
                              : component.id === "bc"
                              ? dayjs(barChartFilterStart)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartFilterStart)
                              : component.id === "pc"
                              ? dayjs(pieChartFilterStart)
                              : undefined
                          }
                          minDate={
                            component.id === "ac"
                              ? dayjs(areaChartMinDate)
                              : component.id === "lc"
                              ? dayjs(lineChartMinDate)
                              : component.id === "bc"
                              ? dayjs(barChartMinDate)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartMinDate)
                              : component.id === "pc"
                              ? dayjs(pieChartMinDate)
                              : ""
                          }
                          maxDate={
                            component.id === "ac"
                              ? dayjs(areaChartMaxDate)
                              : component.id === "lc"
                              ? dayjs(lineChartMaxDate)
                              : component.id === "bc"
                              ? dayjs(barChartMaxDate)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartMaxDate)
                              : component.id === "pc"
                              ? dayjs(pieChartMaxDate)
                              : ""
                          }
                          sx={{
                            maxWidth: "11rem",
                          }}
                          onChange={(startDate) =>
                            handleComponentUpdate(
                              component.id,
                              "filter",
                              String(startDate) ?? undefined
                            )
                          }
                        ></DatePicker>
                        <DatePicker
                          label="End date"
                          slotProps={{
                            textField: { size: "small", error: false },
                          }}
                          disableHighlightToday
                          views={["year", "month", "day"]}
                          value={
                            component.id === "ac"
                              ? dayjs(areaChartFilterEnd)
                              : component.id === "lc"
                              ? dayjs(lineChartFilterEnd)
                              : component.id === "bc"
                              ? dayjs(barChartFilterEnd)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartFilterEnd)
                              : component.id === "pc"
                              ? dayjs(pieChartFilterEnd)
                              : ""
                          }
                          minDate={
                            component.id === "ac"
                              ? dayjs(areaChartMinDate)
                              : component.id === "lc"
                              ? dayjs(lineChartMinDate)
                              : component.id === "bc"
                              ? dayjs(barChartMinDate)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartMinDate)
                              : component.id === "pc"
                              ? dayjs(pieChartMinDate)
                              : ""
                          }
                          maxDate={
                            component.id === "ac"
                              ? dayjs(areaChartMaxDate)
                              : component.id === "lc"
                              ? dayjs(lineChartMaxDate)
                              : component.id === "bc"
                              ? dayjs(barChartMaxDate)
                              : component.id === "bbc"
                              ? dayjs(brushBarChartMaxDate)
                              : component.id === "pcc"
                              ? dayjs(pieChartMaxDate)
                              : ""
                          }
                          sx={{
                            maxWidth: "11rem",
                          }}
                          onChange={(endDate) =>
                            handleComponentUpdate(
                              component.id,
                              "filter",
                              undefined,
                              String(endDate) ?? undefined
                            )
                          }
                        ></DatePicker>
                      </Box>
                      {component.id === "ac" && areaChartSorting && (
                        <SortDescIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "ac" && !areaChartSorting && (
                        <SortAscIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "lc" && lineChartSorting && (
                        <SortDescIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "lc" && !lineChartSorting && (
                        <SortAscIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "bc" && barChartSorting && (
                        <SortDescIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "bc" && !barChartSorting && (
                        <SortAscIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "bbc" && brushBarChartSorting && (
                        <SortDescIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "bbc" && !brushBarChartSorting && (
                        <SortAscIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "pc" && pieChartSorting && (
                        <SortDescIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                      {component.id === "pc" && !pieChartSorting && (
                        <SortAscIcon
                          onClick={() =>
                            handleComponentUpdate(component.id, "sort")
                          }
                        />
                      )}
                    </>
                  )}
                  {toggleComponentFullscreen.length === 0 ? (
                    <IconButton
                      title="Toggle fullscreen"
                      sx={{
                        ml: "0.5rem",
                      }}
                      onClick={() =>
                        handleToggleComponentFullscreen(component.id)
                      }
                    >
                      <FullscreenIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      title="Exit fullscreen"
                      sx={{
                        ml: "0.5rem",
                      }}
                      onClick={() => handleToggleComponentFullscreen("")}
                    >
                      <FullscreenExitIcon />
                    </IconButton>
                  )}
                  <IconButton
                    title="Configure"
                    sx={{
                      mx: "0.5rem",
                    }}
                    onClick={() => handleOpenComponentSettings(component.id)}
                  >
                    <SettingsIcon />
                  </IconButton>
                  <ToolbarHide
                    onClick={() =>
                      handleComponentUpdate(component.id, "toolbar")
                    }
                  />
                </Box>
              </FlexBetween>
              {openComponentSettings === component.id && (
                <Dialog open={true}>
                  <Box sx={{ minWidth: "22.5rem" }}>
                    <FlexBetween
                      sx={{
                        p: "0.5rem 0.5rem 0.25rem 1.5rem",
                        mb: "1rem",
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? theme.palette.background.default
                            : theme.palette.background.paper,
                      }}
                    >
                      <Typography variant="body1">{component.label}</Typography>
                      <IconButton
                        title="Close"
                        onClick={() => handleOpenComponentSettings("")}
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBetween>
                    <DialogContent>
                      <Box
                        pb={4}
                        display="flex"
                        flexDirection="column"
                        width="100%"
                      >
                        <TextField
                          label="Title"
                          spellCheck="false"
                          value={
                            component?.id === "sc"
                              ? scatterChartTitle
                              : component?.id === "ac"
                              ? areaChartTitle
                              : component?.id === "lc"
                              ? lineChartTitle
                              : component?.id === "bc"
                              ? barChartTitle
                              : component?.id === "bbc"
                              ? brushBarChartTitle
                              : component?.id === "rc"
                              ? radarChartTitle
                              : component?.id === "pc"
                              ? pieChartTitle
                              : ""
                          }
                          onChange={(e) =>
                            handleComponentUpdate(
                              component.id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </Box>
                      <Box
                        pb={2}
                        display="flex"
                        flexDirection="column"
                        rowGap={4}
                      >
                        <FlexBetween>
                          <FormControl sx={{ width: "16.5rem" }}>
                            <InputLabel aria-invalid id="data">
                              Data
                            </InputLabel>
                            <Select
                              labelId="data"
                              input={<OutlinedInput label="Data" />}
                              value={
                                component?.id === "sc"
                                  ? scatterChartSelectedTable
                                  : component?.id === "ac"
                                  ? areaChartSelectedTable
                                  : component?.id === "lc"
                                  ? lineChartSelectedTable
                                  : component?.id === "bc"
                                  ? barChartSelectedTable
                                  : component?.id === "bbc"
                                  ? brushBarChartSelectedTable
                                  : component?.id === "rc"
                                  ? radarChartSelectedTable
                                  : component?.id === "pc"
                                  ? pieChartSelectedTable
                                  : ""
                              }
                            >
                              {componentTables.map((table) => {
                                let includes;
                                switch (component.id) {
                                  case "sc":
                                    includes = table.includes("Scatter_");
                                    break;
                                  case "ac":
                                    includes = table.includes("Bar_");
                                    break;
                                  case "lc":
                                    includes = table.includes("Bar_");
                                    break;
                                  case "bc":
                                    includes = table.includes("Bar_");
                                    break;
                                  case "bbc":
                                    includes = table.includes("Bar_");
                                    break;
                                  case "rc":
                                    includes = table.includes("Radar_");
                                    break;
                                  case "pc":
                                    includes = table.includes("Pie_");
                                    break;
                                  default:
                                    includes = false;
                                }

                                if (includes) {
                                  return (
                                    <MenuItem
                                      key={table}
                                      value={table}
                                      onClick={() =>
                                        handleComponentUpdate(
                                          component.id,
                                          "table",
                                          table
                                        )
                                      }
                                    >
                                      {table}
                                    </MenuItem>
                                  );
                                }
                                return null;
                              })}
                            </Select>
                          </FormControl>
                          <Tooltip
                            title={
                              component.id === "sc"
                                ? "Data must follow a structure: [{value 1, value 2}]"
                                : component.id === "ac"
                                ? "Data must follow a structure: [{date, value 1, value 2}]"
                                : component.id === "lc"
                                ? "Data must follow a structure: [{date, value 1, value 2}]"
                                : component.id === "bc"
                                ? "Data must follow a structure: [{date, value 1, value 2}]"
                                : component.id === "bbc"
                                ? "Data must follow a structure: [{date, value 1, value 2}]"
                                : component.id === "rc"
                                ? "Data must follow a structure: [{label, value}]"
                                : component.id === "pc"
                                ? "Data must follow a structure: [{label, value}]"
                                : null
                            }
                            placement="top"
                          >
                            <IconButton sx={{ color: "info.main" }}>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </FlexBetween>
                        {component.id === "sc" && (
                          <ColorPicker
                            label="Color"
                            labelId="scatter"
                            color={scatterChartColor}
                            onChange={(color) =>
                              handleComponentUpdate(
                                component.id,
                                "color",
                                color
                              )
                            }
                          />
                        )}
                        {component.id === "ac" && (
                          <>
                            <ColorPicker
                              label="Color 1"
                              labelId="areaX"
                              color={areaChartColorX}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  color
                                )
                              }
                            />
                            <ColorPicker
                              label="Color 2"
                              labelId="areaY"
                              color={areaChartColorY}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  "",
                                  color
                                )
                              }
                            />
                          </>
                        )}
                        {component.id === "lc" && (
                          <>
                            <ColorPicker
                              label="Color 1"
                              labelId="lineX"
                              color={lineChartColorX}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  color
                                )
                              }
                            />
                            <ColorPicker
                              label="Color 2"
                              labelId="lineY"
                              color={lineChartColorY}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  "",
                                  color
                                )
                              }
                            />
                          </>
                        )}
                        {component.id === "bc" && (
                          <>
                            <ColorPicker
                              label="Color 1"
                              labelId="barX"
                              color={barChartColorX}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  color
                                )
                              }
                            />
                            <ColorPicker
                              label="Color 2"
                              labelId="barY"
                              color={barChartColorY}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  "",
                                  color
                                )
                              }
                            />
                          </>
                        )}
                        {component.id === "bbc" && (
                          <>
                            <ColorPicker
                              label="Color 1"
                              labelId="brushX"
                              color={brushBarChartColorX}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  color
                                )
                              }
                            />
                            <ColorPicker
                              label="Color 2"
                              labelId="brushY"
                              color={brushBarChartColorY}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  "",
                                  color
                                )
                              }
                            />
                          </>
                        )}
                        {component.id === "rc" && (
                          <ColorPicker
                            label="Color"
                            labelId="radar"
                            color={radarChartColor}
                            onChange={(color) =>
                              handleComponentUpdate(
                                component.id,
                                "color",
                                color
                              )
                            }
                          />
                        )}
                        {component.id === "pc" && (
                          <>
                            <ColorPicker
                              label="Color"
                              labelId="pie"
                              color={pieChartColor}
                              onChange={(color) =>
                                handleComponentUpdate(
                                  component.id,
                                  "color",
                                  color
                                )
                              }
                            />
                            <FlexBetween>
                              <TextField
                                sx={{ width: "8rem" }}
                                label="Lightness (min)"
                                type="number"
                                value={pieChartLMin}
                                InputProps={{
                                  inputProps: { min: 0, max: 100 },
                                }}
                                onChange={(e) =>
                                  handleComponentUpdate(
                                    component.id,
                                    "lMin",
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <TextField
                                sx={{ width: "8rem" }}
                                label="Lightness (max)"
                                type="number"
                                value={pieChartLMax}
                                InputProps={{
                                  inputProps: { min: 0, max: 100 },
                                }}
                                onChange={(e) =>
                                  handleComponentUpdate(
                                    component.id,
                                    "lMax",
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <Tooltip
                                title="Color lightness value (0-100)."
                                placement="top"
                              >
                                <IconButton sx={{ color: "info.main" }}>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </FlexBetween>
                          </>
                        )}
                      </Box>
                    </DialogContent>
                  </Box>
                </Dialog>
              )}
              {component.component}
            </Box>
          ))}
        </Box>
      )}

      {selectedComponents.length === 0 && (
        <Box sx={{ pl: "2rem", pt: "10rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography variant="h5">Welcome, {name}!</Typography>
              <Typography variant="h6">This is your dashboard.</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography variant="body1">
                Get started by adding components to your dashboard from the
                'Components' tab above.
              </Typography>
              <Typography variant="body1" display="flex">
                Navigate to {<SettingsIcon sx={{ mx: "0.5rem" }} />} in a
                components top right corner to configure it's appearance and
                data.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
