"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    // TODO add all the variations of the colors (light, dark, text)
    primary: {
      main: "#EFE1D1",
    },
    secondary: {
      main: "#eda740",
    },
    mode: "light",
    text: {
      primary: "grey",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
