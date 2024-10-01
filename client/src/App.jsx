import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import { AppRouter } from "./routers";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the global animation duration
      mirror: false, // Allow animations to happen both on scroll down and up
      easing: "ease-in-out",
      once: false, // Allow animations to happen multiple times
      delay: 300, // Set the delay between animations
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
