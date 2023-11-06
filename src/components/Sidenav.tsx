import {
  Button,
  CSSObject,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
  useTheme,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  TableView,
  Storage,
  Dashboard,
  Analytics,
  Settings,
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
interface SidenavProps {
  sidenavTableList: string[];
}
const Sidenav: React.FC<SidenavProps> = (props: {
  sidenavTableList: string[];
}) => {
  const [selected, setSelected] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme<Theme>();

  const drawerWidth = 280;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    marginTop: "4rem",
    height: "calc(100% - 4rem)",
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    backgroundColor: theme.palette.background.default,
    marginTop: "4rem",
    height: "calc(100% - 4rem)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    overflowX: "hidden",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleOpenDropdown = (): void => {
    setDropdownOpen(true);
  };

  const handleOpenDrawer = (): void => {
    setOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setOpen(false);
    setDropdownOpen(false);
  };

  interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    onClick?: () => void;
    sidenavTableList?: string[];
  }

  function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, onClick, sidenavTableList } = props;
    return (
      <Button
        fullWidth
        size="small"
        tabIndex={-1}
        sx={{
          textTransform: "none",
          color: "inherit",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          ...(selected === to && {
            backgroundColor: theme.palette.action.selected,
          }),
        }}
      >
        <ListItem
          sx={{
            color: "inherit",
            outline: "none",
            pl: open ? "2.5rem" : "0.85rem",
          }}
          component={Link}
          to={to}
          onClick={onClick}
        >
          {icon ? (
            <ListItemIcon
              sx={{
                fontSize: "26px",
                color: "inherit",
              }}
            >
              {icon}
            </ListItemIcon>
          ) : null}
          <ListItemText
            sx={{
              textDecoration: "inherit",
              ...(!open && { visibility: "hidden" }),
            }}
            primary={primary}
          />
          {sidenavTableList && sidenavTableList?.length !== 0 && (
            <ListItemIcon sx={{ color: "inherit", pl: "2rem" }}>
              {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          )}
        </ListItem>
      </Button>
    );
  }

  return (
    <Drawer variant="permanent" open={open}>
      <IconButton
        color="inherit"
        title="Collapse"
        onClick={handleCloseDrawer}
        sx={{
          fontSize: "26px",
          alignSelf: "end",
          mr: "0.5rem",
          ...(!open && { display: "none" }),
        }}
      >
        <AiOutlineMenuFold />
      </IconButton>

      <IconButton
        color="inherit"
        title="Expand"
        onClick={handleOpenDrawer}
        sx={{
          fontSize: "26px",
          alignSelf: "center",
          ...(open && { display: "none" }),
        }}
      >
        <AiOutlineMenuUnfold />
      </IconButton>

      <List sx={{ mt: "2rem" }}>
        <ListItemLink
          to="/"
          primary="Dashboard"
          icon={<Dashboard />}
          onClick={() => {
            setSelected("/");
            setDropdownOpen(false);
          }}
        />
        <ListItemLink
          to="/tables"
          primary="Tables"
          icon={<Storage />}
          onClick={() => {
            setSelected("/tables");
            handleOpenDropdown();
          }}
          sidenavTableList={props.sidenavTableList}
        />
        {props.sidenavTableList?.length !== 0 && (
          <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
            <List
              sx={{
                padding: "0",
                maxWidth: "100%",
              }}
            >
              {props.sidenavTableList?.map((table, i) => (
                <ListItemLink
                  to={`/tables/${table}Table`}
                  primary={table}
                  icon={
                    <TableView
                      sx={{
                        ml: open ? "2rem" : "0",
                        mr: open ? "2rem" : "0",
                      }}
                    />
                  }
                  key={i}
                  onClick={() => {
                    setSelected(`/table/${table}`);
                  }}
                />
              ))}
            </List>
          </Collapse>
        )}
        <ListItemLink
          to="/analytics"
          primary="Analytics"
          icon={<Analytics />}
          onClick={() => {
            setSelected("/analytics");
            setDropdownOpen(false);
          }}
        />
        <ListItemLink
          to="/settings"
          primary="Settings"
          icon={<Settings />}
          onClick={() => {
            setSelected("/settings");
            setDropdownOpen(false);
          }}
        />
      </List>
    </Drawer>
  );
};

export default Sidenav;
