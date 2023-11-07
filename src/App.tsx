import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Tables from "./components/Tables";
import Analytics from "./components/Analytics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import {
  Box,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ColorModeContext } from "./color-context";
import Sidenav from "./components/Sidenav";
import TransactionTable from "./components/tables/TransactionTable";
import ProjectTable from "./components/tables/ProjectTable";
import Settings from "./components/Settings";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Login from "./components/Login";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App(_Props: { toggleColorMode: void }) {
  const queryClient = new QueryClient();
  const [sidenavTableList, setSidenavTableList] = useState<string[]>([]);

  const fetchSidenavTableList = async () => {
    try {
      const url = new URL("/sidenav/tables", import.meta.env.VITE_BASE_URL);
      const response = await fetch(url.href);
      const tablenames = await response.json();
      setSidenavTableList(tablenames);
    } catch (err) {
      console.error("URL not found", err);
    }
  };

  useEffect(() => {
    fetchSidenavTableList();
  }, []);

  const prefersDarkMode = useMediaQuery<string>("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<string>();

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (): void => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: grey,
            divider: grey[500],
            background: {
              default: "hsl(40,0%,8%)",
              paper: grey[900],
            },
            text: {
              primary: grey[100],
              secondary: grey[50],
            },
          }
        : {
            primary: grey,
            divider: grey[500],
            background: {
              default: grey[200],
              paper: grey[50],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }),
    },
  });

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  );
  return (
    <>
      <AuthenticatedTemplate>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Provider store={store}>
                <Box
                  display="flex"
                  width="100%"
                  height="100%"
                  position="fixed"
                  top="4rem"
                  maxHeight="calc(100% - 4rem)"
                >
                  <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <Navbar />
                      <Sidenav sidenavTableList={sidenavTableList} />
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route
                          path="/tables/TransactionTable"
                          element={<TransactionTable />}
                        />
                        <Route
                          path="/tables/ProjectTable"
                          element={<ProjectTable />}
                        />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </ThemeProvider>
                  </ColorModeContext.Provider>
                </Box>
              </Provider>
            </BrowserRouter>
          </QueryClientProvider>
        </LocalizationProvider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
