import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { listAssessments } from "../../store/slices/assessmentsSlice";
import { ModalCreateAssessment } from "../../components/ModalCreateAssessment";
import { toggleModal } from "../../store/slices/modalSlice";
import { useEffect } from "react";
import { TableAssessments } from "../../components/TableAssessments";

export function AssessmentList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  function handleAddAssessment() {
    dispatch(toggleModal());
  }

  useEffect(() => {
    dispatch(listAssessments());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      alert("Faça login para acessar as avaliações.");
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Avaliações</Typography>

        <Button
          variant="contained"
          onClick={handleAddAssessment}
          sx={{ mb: 2 }}
        >
          Criar avaliação
        </Button>

        <TableAssessments />

        <ModalCreateAssessment />
      </Box>
    </Container>
  );
}
