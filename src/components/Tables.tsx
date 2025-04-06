import { Box, useTheme } from "@mui/material";
import TransactionReactQueryProvider from "./tables/TransactionTable";
import ProjectTable from "./tables/ProjectTable";
import React from "react";

const Tables: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      py="4rem"
      overflow="auto"
      bgcolor={theme.palette.background.paper}
    >
      <Box display="flex" flexDirection="column" rowGap="4rem">
        <ProjectTable />
        <TransactionReactQueryProvider />
      </Box>
    </Box>
  );
};

export default Tables;
