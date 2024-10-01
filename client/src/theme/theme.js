import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",

    },
    secondary: {
      main: "#f50057",
    },
  },

  components: {
    // Global component styles can be added here
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "primary" && {}),
        }),
      },
    },
  },
});

export default theme;
