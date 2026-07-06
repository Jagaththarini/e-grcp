import { createTheme } from "@mui/material/styles";

const commonTypography = {
  fontFamily: '"Poppins","Inter","Segoe UI",sans-serif',

  h1: { fontWeight: 700, fontSize: "2.2rem" },
  h2: { fontWeight: 700, fontSize: "1.9rem" },
  h3: { fontWeight: 600, fontSize: "1.6rem" },
  h4: { fontWeight: 600, fontSize: "1.35rem" },
  h5: { fontWeight: 600, fontSize: "1.15rem" },
  h6: { fontWeight: 600, fontSize: "1rem" },

  body1: {
    fontSize: "0.95rem",
    lineHeight: 1.7,
  },

  body2: {
    fontSize: "0.85rem",
    lineHeight: 1.6,
  },

  button: {
    textTransform: "none",
    fontWeight: 600,
  },

  caption: {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#0F766E",
      light: "#14B8A6",
      dark: "#115E59",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#1D4ED8",
      light: "#3B82F6",
      dark: "#1E3A8A",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    info: {
      main: "#2563EB",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },

    divider: "#E5E7EB",
  },

  typography: commonTypography,

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F8FAFC",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E5E7EB",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 22px",
          fontWeight: 600,
        },

        contained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          color: "#111827",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            background: "#F1F5F9",
            color: "#111827",
            fontWeight: 700,
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },

        columnHeaders: {
          backgroundColor: "#F8FAFC",
          fontWeight: 700,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#22C55E",
      light: "#4ADE80",
      dark: "#15803D",
    },

    secondary: {
      main: "#60A5FA",
      light: "#93C5FD",
      dark: "#2563EB",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#FBBF24",
    },

    error: {
      main: "#F87171",
    },

    info: {
      main: "#38BDF8",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
    },

    divider: "#334155",
  },

  typography: commonTypography,

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0F172A",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "#1E293B",
          border: "1px solid #334155",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#111827",
          borderRight: "1px solid #334155",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#111827",
          color: "#F8FAFC",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            background: "#1E293B",
            color: "#F8FAFC",
            fontWeight: 700,
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },

        columnHeaders: {
          backgroundColor: "#1E293B",
        },
      },
    },
  },
});