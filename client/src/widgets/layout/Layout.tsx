import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Box, Container } from "@mui/material";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: '100vw' }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
        <Sidebar />
        <Container sx={{ flex: 1, width: '100%' }}>
          <Outlet /> 
        </Container>
      </Box>
    </Box>
  );
};