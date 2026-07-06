import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;
const HEADER_HEIGHT = 64;

function AppLayout() {
  const { sidebarOpen, sidebarCollapsed } = useSelector(
    (state) => state.ui
  );

  const effectiveWidth = !sidebarOpen
    ? 0
    : sidebarCollapsed
    ? SIDEBAR_COLLAPSED
    : SIDEBAR_WIDTH;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <AppSidebar
        width={SIDEBAR_WIDTH}
        collapsedWidth={SIDEBAR_COLLAPSED}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          ml: `${effectiveWidth}px`,
          transition: "margin .25s ease",
          minWidth: 0,
        }}
      >
        <AppHeader height={HEADER_HEIGHT} />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            p: 3,
            mt: `${HEADER_HEIGHT}px`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;