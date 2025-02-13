import {
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export function LoadingModal() {
  const isLoading = useAppSelector((state) => state.loading);

  return (
    <Dialog open={isLoading}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ mb: 3 }} />
        <Typography variant="h5">Aguarde! Carregando...</Typography>
      </DialogContent>
    </Dialog>
  );
}
