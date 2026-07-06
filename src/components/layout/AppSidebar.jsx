import React, { useMemo } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    roles: [
      "Admin",
      "Risk Manager",
      "Procurement Manager",
      "Auditor",
      "Employee",
    ],
  },

  {
    label: "Procurement",
    icon: <ShoppingCartIcon />,
    path: "/procurement",
    roles: ["Admin", "Procurement Manager"],
  },

  {
    label: "Vendors",
    icon: <StoreIcon />,
    path: "/vendors",
    roles: ["Admin", "Procurement Manager"],
  },

  {
    label: "Risk Center",
    icon: <SecurityIcon />,
    path: "/risk",
    roles: ["Admin", "Risk Manager"],
  },

  {
    label: "Compliance",
    icon: <VerifiedUserIcon />,
    path: "/compliance",
    roles: ["Admin", "Auditor"],
  },

  {
    label: "Audit Center",
    icon: <AssignmentIcon />,
    path: "/audit",
    roles: ["Admin", "Auditor"],
  },

  {
    label: "Approval",
    icon: <CheckCircleOutlineIcon />,
    path: "/approval",
    roles: [
      "Admin",
      "Employee",
      "Risk Manager",
      "Procurement Manager",
      "Auditor",
    ],
  },

  {
    label: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
    roles: [
      "Admin",
      "Employee",
      "Risk Manager",
      "Procurement Manager",
      "Auditor",
    ],
  },

  {
    label: "Reports",
    icon: <BarChartIcon />,
    path: "/reports",
    roles: [
      "Admin",
      "Risk Manager",
      "Auditor",
    ],
  },

  {
    label: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    roles: ["Admin"],
  },
];

function AppSidebar({ width, collapsedWidth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarOpen = useSelector(
    (state) => state.ui.sidebarOpen
  );

  const sidebarCollapsed = useSelector(
    (state) => state.ui.sidebarCollapsed
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const drawerWidth = sidebarCollapsed
    ? collapsedWidth
    : width;

  const filteredNavItems = useMemo(() => {
    if (!user) return [];

    return navItems.filter((item) =>
      item.roles.includes(user.role)
    );
  }, [user]);

    const drawerContent = useMemo(
    () => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            px: sidebarCollapsed ? 1.5 : 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              eG
            </Typography>
          </Box>

          {!sidebarCollapsed && (
            <Box ml={1.5}>
              <Typography
                fontWeight={700}
                fontSize={14}
                color="primary.main"
              >
                e-GRCP
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Enterprise Platform
              </Typography>
            </Box>
          )}
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            py: 1,
          }}
        >
          <List disablePadding dense>
            {filteredNavItems.map((item) => {
              const isActive =
                location.pathname.startsWith(item.path);

              return (
                <Tooltip
                  key={item.path}
                  title={sidebarCollapsed ? item.label : ""}
                  placement="right"
                >
                  <ListItemButton
                    selected={isActive}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      my: 0.4,
                      borderRadius: 2,
                      px: sidebarCollapsed ? 1.5 : 2,

                      "&.Mui-selected": {
                        bgcolor: "primary.main",
                        color: "#fff",

                        "& .MuiListItemIcon-root": {
                          color: "#fff",
                        },

                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      },

                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: sidebarCollapsed
                          ? "auto"
                          : 36,
                        color: isActive
                          ? "inherit"
                          : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {!sidebarCollapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: isActive
                            ? 600
                            : 400,
                          fontSize: "0.85rem",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </List>
        </Box>

        {/* User */}
        {user && (
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              p: sidebarCollapsed ? 1 : 2,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 36,
                  height: 36,
                }}
              >
                {user.name?.charAt(0)}
              </Avatar>

              {!sidebarCollapsed && (
                <Box
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    noWrap
                  >
                    {user.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                  >
                    {user.role}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    ),
    [
      sidebarCollapsed,
      filteredNavItems,
      location.pathname,
      navigate,
      user,
    ]
  );

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "width .25s ease",
          boxSizing: "border-box",
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default React.memo(AppSidebar);