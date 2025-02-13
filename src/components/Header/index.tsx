import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ToggleThemeIcon from "@mui/icons-material/Brightness4";

import { useAppDispatch } from "../../store/hooks";
import { toggleTheme } from "../../store/slices/themeSlice";

export function Header() {
  const dispatch = useAppDispatch();

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }

  return (
    <AppBar sx={{ marginBottom: "1rem" }} position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GrowAvalia
        </Typography>

        <IconButton color="inherit" onClick={handleToggleTheme}>
          <ToggleThemeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
