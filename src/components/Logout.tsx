import { useMsal } from "@azure/msal-react";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout: React.FC = () => {
  const { instance } = useMsal();
  const initializeSignOut = (): void => {
    instance.logoutRedirect();
  };
  return (
    <IconButton onClick={initializeSignOut} color="inherit" title="Logout">
      <LogoutIcon />
    </IconButton>
  );
};

export default Logout;
