import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  selectComposedChartFields,
  selectDashboardFields,
} from "../reducers/selectors";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useEffect, useState } from "react";
import {
  setComposedChartColorX,
  setComposedChartColorY,
  setComposedChartColorZ,
  setComposedChartData,
  setComposedChartDisplayValues,
  setComposedChartGroupBy,
  setComposedChartSelectedTable,
  setComposedChartSorting,
  setComposedChartTitle,
  setComposedChartToolbarVisible,
} from "../reducers/_composedChartSlice";
import {
  setComponentTables,
  setToggleComponentFullscreen,
} from "../reducers/dashboardSlice";
import {
  ColorPicker,
  Component,
  ControlsHide,
  ControlsShow,
  FlexBetween,
  SortAscIcon,
  SortDescIcon,
  ToggleChartValues,
  groupByOpt,
} from "./dashboard/DashboardComponents";
import _ComposedChart from "./recharts/_ComposedChart";
import React from "react";

const Analytics: React.FC = React.memo(() => {
  const theme = useTheme();
  const dispatch = useDispatch<Dispatch<AnyAction>>();

  useEffect(() => {
    fetchComponentTables();
  }, []);

  const [openComponentSettings, setOpenComponentSettings] =
    useState<string>("");

  const { toggleComponentFullscreen, componentTables } = useSelector(
    selectDashboardFields
  );

  const {
    composedChartSelectedTable,
    composedChartTitle,
    composedChartColorX,
    composedChartColorY,
    composedChartColorZ,
    composedChartSorting,
    composedChartGroupBy,
    composedChartToolbarVisible,
    composedChartDisplayValues,
  } = useSelector(selectComposedChartFields);

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
        case "cc":
          dispatch(setComposedChartData(data));
          break;
      }
    }
  };

  const handleComponentUpdate = (
    id: string,
    action: any,
    arg0?: any,
    arg1?: any,
    arg2?: any
  ): void => {
    const component = components.find((c) => c.id === id);
    if (component) {
      switch (id) {
        case "cc":
          switch (action) {
            case "table":
              fetchSelectedTable(id, arg0);
              dispatch(setComposedChartSelectedTable(arg0));
              break;
            case "title":
              dispatch(setComposedChartTitle(arg0));
              break;
            case "color":
              arg0 && dispatch(setComposedChartColorX(arg0));
              arg1 && dispatch(setComposedChartColorY(arg1));
              arg2 && dispatch(setComposedChartColorZ(arg2));
              break;
            case "sort":
              dispatch(setComposedChartSorting(!composedChartSorting));
              break;
            case "group":
              fetchSelectedTable(id, arg0, arg1);
              dispatch(setComposedChartGroupBy(arg1));
              break;
            case "values":
              dispatch(
                setComposedChartDisplayValues(!composedChartDisplayValues)
              );
              break;
            case "toolbar":
              dispatch(
                setComposedChartToolbarVisible(!composedChartToolbarVisible)
              );
          }
          break;
      }
    }
  };

  const handleOpenComponentSettings = (id: string): void => {
    setOpenComponentSettings(id);
  };

  const handleToggleComponentFullscreen = (id: string) => {
    dispatch(setToggleComponentFullscreen(id));
  };

  const components: Component[] = [
    {
      id: "cc",
      label: "Composed Chart",
      component: <_ComposedChart />,
    },
  ];

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{
          display: "grid",
          height: "100%",
          gridTemplateColumns: "100%",
          gridAutoRows: "100%",
          gridAutoFlow: "dense",
          padding: "1rem 2rem",
          gap: "5rem",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {components.map((component) => (
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
              pb: "4rem",
              height: "100%",
              minWidth: "100%",
              aspectRatio: "100%",
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
                gridTemplateColumns: "1fr auto auto",
              }}
            >
              {/* GRID ROW TOP */}
              <Typography variant="body1">
                {component.id === "cc" ? composedChartTitle : ""}
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
                    display: composedChartToolbarVisible ? "flex" : "none",
                  }}
                >
                  {/* TOOGLE VALUES ICON */}
                  {component.id === "cc" ? (
                    <ToggleChartValues
                      onClick={() =>
                        handleComponentUpdate(component.id, "values")
                      }
                    />
                  ) : null}

                  {/* SORT ICONS */}
                  {component.id === "cc" && composedChartSorting ? (
                    <SortDescIcon
                      onClick={() =>
                        handleComponentUpdate(component.id, "sort")
                      }
                    />
                  ) : component.id === "cc" && !composedChartSorting ? (
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
                {component.id === "cc" && composedChartToolbarVisible ? (
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
                  gridRow: "1",
                  gridColumn: "3",
                  gap: "1rem",
                  display:
                    component.id === "cc" && composedChartToolbarVisible
                      ? "flex"
                      : "none",
                }}
              >
                {["cc"].includes(component.id) && (
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
                      value={component.id === "cc" ? composedChartGroupBy : ""}
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
                              component.id === "cc"
                                ? composedChartSelectedTable
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
                        value={component?.id === "cc" ? composedChartTitle : ""}
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
                              component?.id === "cc"
                                ? composedChartSelectedTable
                                : ""
                            }
                          >
                            {componentTables.map((table) => {
                              let includes;
                              switch (component.id) {
                                case "cc":
                                  includes = table.includes("Transaction");
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
                            component.id === "cc"
                              ? "Data must follow a structure: [{date, value 1, value 2, value 3}]"
                              : null
                          }
                          placement="top"
                        >
                          <IconButton sx={{ color: "info.main" }}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </FlexBetween>

                      {component.id === "cc" && (
                        <>
                          <ColorPicker
                            label="Color 1"
                            labelId="composedX"
                            color={composedChartColorX}
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
                            labelId="composedY"
                            color={composedChartColorY}
                            onChange={(color) =>
                              handleComponentUpdate(
                                component.id,
                                "color",
                                "",
                                color
                              )
                            }
                          />
                          <ColorPicker
                            label="Color 2"
                            labelId="composedZ"
                            color={composedChartColorZ}
                            onChange={(color) =>
                              handleComponentUpdate(
                                component.id,
                                "color",
                                "",
                                "",
                                color
                              )
                            }
                          />
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
    </Box>
  );
});

export default Analytics;
