import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";

const Settings: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const theme = useTheme();
  const [connectionValue, setConnectionValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [connectionList, setConnectionList] = useState<string[]>([]);
  const [selectedConnString, setSelectedConnString] = useState<string>("");
  const [activeConnectionString, setActiveConnectionString] =
    useState<string>("");
  const [deleteItem, setDeleteItem] = useState<string>("");

  useEffect(() => {
    getConnectionList();
    checkConnection();
  }, []);

  const addConnection = async (): Promise<void> => {
    if (connectionValue !== "") {
      const url = new URL("/connections", BASE_URL);
      await fetch(`${url.href}?connString=${connectionValue}`, {
        method: "POST",
      });
      setConnectionValue("");
      getConnectionList();
    }
  };

  const setConnection = async (conn: string): Promise<void> => {
    const url = new URL("/connections/set", BASE_URL);
    await fetch(`${url.href}?conn=${conn ? conn : ""}`, {
      method: "POST",
    });
  };

  const deleteConnection = async (conn: string): Promise<void> => {
    const url = new URL("/connections/delete", BASE_URL);
    await fetch(`${url.href}?conn=${conn}`, {
      method: "DELETE",
    });
    setDeleteItem("");
    getConnectionList();
  };

  const checkConnection = async (): Promise<void> => {
    const url = new URL("/connections/active", BASE_URL);
    await fetch(url.href)
      .then((res) => res.text())
      .then((data) => {
        setActiveConnectionString(data);
      });
  };

  const getConnectionList = async (): Promise<void> => {
    const url = new URL("/connections", BASE_URL);
    await fetch(url.href)
      .then((res) => res.json())
      .then((data) => {
        setConnectionList(data);
      });
  };

  const handleClose = () => {
    setDeleteItem("");
    setOpen(false);
  };

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      height="100%"
      width="100%"
      padding="2rem"
      display="grid"
    >
      <Typography variant="h5">Application settings</Typography>

      <Box display="flex" flexDirection="column" maxWidth="40%" gap="2rem">
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            padding: "1.5rem",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "hsl(0,0%,15%)"
                : "hsl(0,0%,100%)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "10px 10px 20px hsl(0,0%,5%)"
                : "10px 10px 20px hsl(0,0%,90%)",
            borderRadius: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: "0.5rem",
            }}
          >
            <Typography variant="h6">Databases</Typography>
            <Tooltip
              title="Add fully qualified connection strings to the list.
              Choose a database from the list to connect the application with."
              placement="top"
            >
              <IconButton sx={{ color: "info.main" }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <List sx={{ pt: "1rem" }}>
            {connectionList.map((conn, i) => (
              <ListItem
                key={i}
                sx={{
                  textOverflow: "ellipsis",
                  display: "flex",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  backgroundColor:
                    conn === selectedConnString
                      ? theme.palette.action.selected
                      : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (selectedConnString === conn) {
                    setSelectedConnString("");
                    setActiveConnectionString("");
                    setConnection("");
                  } else {
                    setSelectedConnString(conn);
                    setActiveConnectionString(conn);
                    setConnection(conn);
                  }
                }}
              >
                <Checkbox
                  value={conn}
                  checked={
                    selectedConnString === conn ||
                    activeConnectionString === conn
                  }
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                />
                <Tooltip title={conn} placement="top">
                  <Typography
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      paddingLeft: "0.5rem",
                    }}
                    variant="body1"
                  >
                    {conn}
                  </Typography>
                </Tooltip>
                <IconButton
                  onClick={() => {
                    setDeleteItem(conn);
                    setOpen(true);
                  }}
                  sx={{
                    display: "flex",
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.common.white,
                    },
                    color: theme.palette.error.main,
                    ml: "auto",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                {deleteItem === conn && (
                  <Dialog
                    onClick={(e) => e.stopPropagation()}
                    open={open}
                    onClose={handleClose}
                  >
                    <DialogContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        wordBreak: "break-all",
                        p: "2rem",
                        gap: "1rem",
                      }}
                    >
                      <Typography variant="body1">{conn}</Typography>
                      <Divider />
                      <Typography variant="body2">
                        Proceeding will terminate this connection!
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{ padding: "1rem" }}>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => deleteConnection(conn)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </ListItem>
            ))}
          </List>
          <TextField
            value={connectionValue}
            type="text"
            onChange={(e) => setConnectionValue(e.target.value)}
            label="Add database"
            sx={{ mt: "1rem" }}
          ></TextField>

          <Button
            variant="outlined"
            color="success"
            sx={{ mt: "1rem", maxWidth: "fit-content" }}
            onClick={addConnection}
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
