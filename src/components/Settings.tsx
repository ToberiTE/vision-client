import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { memo } from "react";

const Settings: React.FC = memo(() => {
  const theme = useTheme();

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
            <Typography variant="h6">Placeholder</Typography>
            <Tooltip
              title="PLACEHOLDER: change this setting to..."
              placement="top"
            >
              <IconButton sx={{ color: "info.main" }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
});

export default Settings;
