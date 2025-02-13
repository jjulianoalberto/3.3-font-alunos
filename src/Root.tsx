import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { router } from "./routes";

import { Header } from "./components/Header";
import { LoadingModal } from "./components/LoadingModal";

import themes from "./themes";
import { useAppSelector } from "./store/hooks";

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? themes.light : themes.dark
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header />
      <LoadingModal />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
