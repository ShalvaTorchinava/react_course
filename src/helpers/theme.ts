import { ThemeOptions, createTheme } from "@mui/material/styles";

export const Theme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e50914",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#191919",
      paper: "#303030",
    },
  },
});
