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
import { FC, memo, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector, useDispatch } from "react-redux";
import {
  setComponentTables,
  setDashboardLayout,
  setSelectedComponentIds,
  setToggleComponentFullscreen,
} from "../../reducers/dashboardSlice";
import _ScatterChart from "../recharts/_ScatterChart";
import _AreaChart from "../recharts/_AreaChart";
import _LineChart from "../recharts/_LineChart";
import _BarChart from "../recharts/_BarChart";
import _RadarChart from "../recharts/_RadarChart";
import _PieChart from "../recharts/_PieChart";
import {
  setScatterChartColor,
  setScatterChartData,
  setScatterChartDisplayValues,
  setScatterChartGroupBy,
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
  setAreaChartGroupBy,
  setAreaChartToolbarVisible,
  setAreaChartDisplayValues,
} from "../../reducers/_areaChartSlice";
import {
  setLineChartColorX,
  setLineChartColorY,
  setLineChartData,
  setLineChartSelectedTable,
  setLineChartSorting,
  setLineChartTitle,
  setLineChartGroupBy,
  setLineChartToolbarVisible,
  setLineChartDisplayValues,
} from "../../reducers/_lineChartSlice";
import {
  setBarChartColorX,
  setBarChartColorY,
  setBarChartData,
  setBarChartSelectedTable,
  setBarChartSorting,
  setBarChartTitle,
  setBarChartGroupBy,
  setBarChartToolbarVisible,
  setBarChartDisplayValues,
} from "../../reducers/_barChartSlice";
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
} from "../../reducers/_pieChartSlice";
import { Action, Dispatch } from "@reduxjs/toolkit";
import {
  SortDescIcon,
  SortAscIcon,
  ColorPicker,
  FlexBetween,
  ControlsHide,
  ControlsShow,
  groupByOpt,
  components,
  ToggleChartValues,
} from "../dashboard/DashboardComponents";
import {
  selectDashboardFields,
  selectAreaChartFields,
  selectLineChartFields,
  selectBarChartFields,
  selectRadarChartFields,
  selectPieChartFields,
  selectScatterChartFields,
} from "../../reducers/selectors";

const Dashboard: FC = memo(() => {
  //#region hooks
  const theme = useTheme();
  const xlScreen = useMediaQuery(theme.breakpoints.up(2000));
  const lgScreen = useMediaQuery(theme.breakpoints.up(1550));
  const dispatch = useDispatch<Dispatch<Action>>();
  const { accounts } = useMsal();
  const name = accounts[0]?.idTokenClaims?.name;
  const [selectedListItems, setSelectedListItems] = useState<string[]>([]);
  const [openComponentSettings, setOpenComponentSettings] =
    useState<string>("");

  useEffect(() => {
    fetchComponentTables();
  }, []);

  const {
    dashboardLayout,
    selectedComponentIds,
    componentTables,
    toggleComponentFullscreen,
  } = useSelector(selectDashboardFields);

  const {
    areaChartSelectedTable,
    areaChartTitle,
    areaChartColorX,
    areaChartColorY,
    areaChartSorting,
    areaChartGroupBy,
    areaChartDisplayValues,
    areaChartToolbarVisible,
  } = useSelector(selectAreaChartFields);

  const {
    lineChartSelectedTable,
    lineChartTitle,
    lineChartColorX,
    lineChartColorY,
    lineChartSorting,
    lineChartGroupBy,
    lineChartDisplayValues,
    lineChartToolbarVisible,
  } = useSelector(selectLineChartFields);

  const {
    barChartSelectedTable,
    barChartTitle,
    barChartColorX,
    barChartColorY,
    barChartSorting,
    barChartGroupBy,
    barChartDisplayValues,
    barChartToolbarVisible,
  } = useSelector(selectBarChartFields);

  const {
    radarChartSelectedTable,
    radarChartTitle,
    radarChartColor,
    radarChartToolbarVisible,
    radarChartGroupBy,
  } = useSelector(selectRadarChartFields);
  const {
    pieChartSelectedTable,
    pieChartTitle,
    pieChartColor,
    pieChartLMin,
    pieChartLMax,
    pieChartSorting,
    pieChartToolbarVisible,
    pieChartGroupBy,
  } = useSelector(selectPieChartFields);
  const {
    scatterChartSelectedTable,
    scatterChartTitle,
    scatterChartColor,
    scatterChartGroupBy,
    scatterChartDisplayValues,
    scatterChartToolbarVisible,
  } = useSelector(selectScatterChartFields);
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
    const url = new URL("/selectedTable", import.meta.env.VITE_BASE_URL);
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
        case "rc":
          dispatch(setRadarChartData(data));
          break;
        case "pc":
          dispatch(setPieChartData(data));
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setScatterChartGroupBy(arg1));
              break;
            case "values":
              dispatch(
                setScatterChartDisplayValues(!scatterChartDisplayValues)
              );
              break;
            case "toolbar":
              dispatch(
                setScatterChartToolbarVisible(!scatterChartToolbarVisible)
              );
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setAreaChartGroupBy(arg1));
              break;
            case "values":
              dispatch(setAreaChartDisplayValues(!areaChartDisplayValues));
              break;
            case "toolbar":
              dispatch(setAreaChartToolbarVisible(!areaChartToolbarVisible));
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setLineChartGroupBy(arg1));
              break;
            case "values":
              dispatch(setLineChartDisplayValues(!lineChartDisplayValues));
              break;
            case "toolbar":
              dispatch(setLineChartToolbarVisible(!lineChartToolbarVisible));
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setBarChartGroupBy(arg1));
              break;
            case "values":
              dispatch(setBarChartDisplayValues(!barChartDisplayValues));
              break;
            case "toolbar":
              dispatch(setBarChartToolbarVisible(!barChartToolbarVisible));
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setRadarChartGroupBy(arg1));
              break;
            case "toolbar":
              dispatch(setRadarChartToolbarVisible(!radarChartToolbarVisible));
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
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setPieChartGroupBy(arg1));
              break;
            case "toolbar":
              dispatch(setPieChartToolbarVisible(!pieChartToolbarVisible));
          }
      }
    }
  };

  const handleOpenComponentSettings = (id: string): void => {
    setOpenComponentSettings(id);
  };

  const handleToggleComponentFullscreen = (id: string) => {
    dispatch(setToggleComponentFullscreen(id));
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
          <InputLabel aria-invalid id="components">
            Components
          </InputLabel>
          <Select
            sx={{
              width: "15rem",
              height: "3.5rem",
            }}
            multiple
            labelId="components"
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
                  selectedComponents.length > 2
                ? "1fr 1fr 1fr"
                : lgScreen &&
                  dashboardLayout === 1 &&
                  selectedComponents.length === 2
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
                    : dashboardLayout === 1 && selectedComponents.length > 2
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
                inset: toggleComponentFullscreen === component.id ? "0" : "",
                zIndex:
                  toggleComponentFullscreen === component.id ? "999999" : "",
              }}
            >
              {/* TOOLBAR CONTAINER */}
              <Box
                sx={{
                  pb: "0.5rem",
                  display: "grid",
                  alignItems: "center",
                  columnGap: "1rem",
                  rowGap: "0.5rem",
                  gridTemplateColumns:
                    dashboardLayout === 0 ||
                    toggleComponentFullscreen === component.id ||
                    (dashboardLayout === 1 &&
                      lgScreen &&
                      selectedComponents.length === 1) ||
                    (dashboardLayout === 1 &&
                      xlScreen &&
                      selectedComponents.length === 2)
                      ? "1fr auto auto"
                      : "1fr auto auto 1fr",
                }}
              >
                {/* GRID ROW TOP */}
                <Typography variant="body1">
                  {component.id === "sc"
                    ? scatterChartTitle
                    : component.id === "ac"
                    ? areaChartTitle
                    : component.id === "lc"
                    ? lineChartTitle
                    : component.id === "bc"
                    ? barChartTitle
                    : component.id === "rc"
                    ? radarChartTitle
                    : component.id === "pc"
                    ? pieChartTitle
                    : ""}
                </Typography>

                {/* ICONS BOX */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gridColumn: 4,
                  }}
                >
                  <Box
                    sx={{
                      display:
                        (component.id === "sc" && scatterChartToolbarVisible) ||
                        (component.id === "ac" && areaChartToolbarVisible) ||
                        (component.id === "lc" && lineChartToolbarVisible) ||
                        (component.id === "bc" && barChartToolbarVisible) ||
                        (component.id === "rc" && radarChartToolbarVisible) ||
                        (component.id === "pc" && pieChartToolbarVisible)
                          ? "flex"
                          : "none",
                    }}
                  >
                    {/* TOOGLE VALUES ICON */}
                    {component.id === "sc" ||
                    component.id === "ac" ||
                    component.id === "lc" ||
                    component.id === "bc" ? (
                      <ToggleChartValues
                        onClick={() =>
                          handleComponentUpdate(component.id, "values")
                        }
                      />
                    ) : null}

                    {/* SORT ICONS */}
                    {(component.id === "ac" && areaChartSorting) ||
                    (component.id === "lc" && lineChartSorting) ||
                    (component.id === "bc" && barChartSorting) ||
                    (component.id === "pc" && pieChartSorting) ? (
                      <SortDescIcon
                        onClick={() =>
                          handleComponentUpdate(component.id, "sort")
                        }
                      />
                    ) : (component.id === "ac" && !areaChartSorting) ||
                      (component.id === "lc" && !lineChartSorting) ||
                      (component.id === "bc" && !barChartSorting) ||
                      (component.id === "pc" && !pieChartSorting) ? (
                      <SortAscIcon
                        onClick={() =>
                          handleComponentUpdate(component.id, "sort")
                        }
                      />
                    ) : null}

                    {/* FULLSCREEN ICONS */}
                    {toggleComponentFullscreen.length === 0 ? (
                      <IconButton
                        title="Enter fullscreen"
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

                    {/* SETTINGS ICON */}
                    <IconButton
                      title="Configure"
                      sx={{
                        mx: "0.5rem",
                      }}
                      onClick={() => handleOpenComponentSettings(component.id)}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Box>

                  {/* TOOLBAR VISIBILITY ICONS */}
                  {(component.id === "sc" && scatterChartToolbarVisible) ||
                  (component.id === "ac" && areaChartToolbarVisible) ||
                  (component.id === "lc" && lineChartToolbarVisible) ||
                  (component.id === "bc" && barChartToolbarVisible) ||
                  (component.id === "rc" && radarChartToolbarVisible) ||
                  (component.id === "pc" && pieChartToolbarVisible) ? (
                    <ControlsHide
                      onClick={() =>
                        handleComponentUpdate(component.id, "toolbar")
                      }
                    />
                  ) : (
                    <ControlsShow
                      onClick={() =>
                        handleComponentUpdate(component.id, "toolbar")
                      }
                    />
                  )}
                </Box>

                {/* GRID ROW BOTTOM */}
                <Box
                  sx={{
                    justifyContent: "end",
                    gridRow:
                      dashboardLayout === 0 ||
                      toggleComponentFullscreen === component.id ||
                      (dashboardLayout === 1 &&
                        lgScreen &&
                        selectedComponents.length === 1) ||
                      (dashboardLayout === 1 &&
                        xlScreen &&
                        selectedComponents.length === 2)
                        ? "1"
                        : "2",
                    gridColumn:
                      dashboardLayout === 0 ||
                      toggleComponentFullscreen === component.id ||
                      (dashboardLayout === 1 &&
                        lgScreen &&
                        selectedComponents.length === 1) ||
                      (dashboardLayout === 1 &&
                        xlScreen &&
                        selectedComponents.length === 2)
                        ? "3"
                        : "1 / span 4",
                    gap: "1rem",
                    display:
                      (component.id === "sc" && scatterChartToolbarVisible) ||
                      (component.id === "ac" && areaChartToolbarVisible) ||
                      (component.id === "lc" && lineChartToolbarVisible) ||
                      (component.id === "bc" && barChartToolbarVisible) ||
                      (component.id === "rc" && radarChartToolbarVisible) ||
                      (component.id === "pc" && pieChartToolbarVisible)
                        ? "flex"
                        : "none",
                  }}
                >
                  {["sc", "ac", "lc", "bc", "rc", "pc"].includes(
                    component.id
                  ) && (
                    <FormControl
                      size="small"
                      sx={{
                        minWidth: "7rem",
                      }}
                    >
                      <InputLabel
                        sx={{ fontSize: "15px" }}
                        aria-invalid
                        id="group"
                      >
                        Group by
                      </InputLabel>
                      <Select
                        labelId="group"
                        sx={{ fontSize: "14px" }}
                        value={
                          component.id === "sc"
                            ? scatterChartGroupBy
                            : component.id === "ac"
                            ? areaChartGroupBy
                            : component.id === "lc"
                            ? lineChartGroupBy
                            : component.id === "bc"
                            ? barChartGroupBy
                            : component.id === "rc"
                            ? radarChartGroupBy
                            : component.id === "pc"
                            ? pieChartGroupBy
                            : ""
                        }
                        input={<OutlinedInput label="Group by-" />}
                      >
                        {groupByOpt.map((opt) => (
                          <MenuItem
                            key={opt}
                            value={opt}
                            sx={{ fontSize: "14px" }}
                            onClick={() =>
                              handleComponentUpdate(
                                component.id,
                                "group",
                                component.id === "sc"
                                  ? scatterChartSelectedTable
                                  : component.id === "ac"
                                  ? areaChartSelectedTable
                                  : component.id === "lc"
                                  ? lineChartSelectedTable
                                  : component.id === "bc"
                                  ? barChartSelectedTable
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
              </Box>

              {/* CONTROLS END */}
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
});

export default Dashboard;
