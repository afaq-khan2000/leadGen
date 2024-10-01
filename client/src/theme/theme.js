import { createTheme } from "@mui/material/styles";
// import "../assets/fonts/TuskerGrotesk3800Super.DODskLYx.woff2";
// import "../assets/fonts/TuskerGrotesk4700Bold.vTnXbop9.woff2";

const theme = createTheme({
  palette: {
    primary: {},
    secondary: {},
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
