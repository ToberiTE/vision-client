import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const Login: React.FC = () => {
  const { instance } = useMsal();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const initializeSignIn = (): void => {
    instance.loginRedirect();
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "grid",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          placeSelf: "center",
          backgroundColor: "white",
          borderTop: "4px solid lightgray",
          borderBottom: "4px solid lightgray",
          mixBlendMode: "lighten",
          zIndex: "1",
          opacity: "0.1",
          height: "20%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: largeScreen ? "row" : "column",
          justifyContent: largeScreen ? "space-around" : "center",
          alignItems: largeScreen ? "" : "center",
          gap: largeScreen ? "" : "2rem",
        }}
      >
        <Box sx={{ width: largeScreen ? "40%" : "80%", zIndex: "0" }}>
          <img
            src="/vision.svg"
            style={{
              height: "100%",
              width: "100%",
              filter: "invert(0.8)",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "40%",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: "2",
          }}
        >
          <Typography fontWeight="1" variant="h2">
            Vision
          </Typography>
          <Button
            color="info"
            size="large"
            sx={{
              color: "white",
              gap: "1rem",
              mt: "2rem",
              width: "fit-content",
            }}
            variant="contained"
            onClick={initializeSignIn}
          >
            <Typography variant="body1">Sign in</Typography>
            <LoginIcon sx={{ color: "white" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
