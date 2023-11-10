import { Box, Typography, useTheme } from "@mui/material";

const Analytics: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      height="100%"
      width="100%"
      display="grid"
    >
      <Box display="flex" flexDirection="column" padding="2rem">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
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
            <Typography variant="h6">
              &lt; Placeholder component &gt;
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
