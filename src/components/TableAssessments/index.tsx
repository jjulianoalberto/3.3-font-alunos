import { ChangeEvent, MouseEvent, useState } from "react";
import { Delete, Edit, Save } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changePage,
  changeRowsPerPage,
} from "../../store/slices/paginationSlice";
import {
  deleteAssessmentThunk,
  updateAssessmentThunk,
} from "../../store/slices/assessmentsSlice";
import { IAssessment } from "../../types";

export function TableAssessments() {
  const dispatch = useAppDispatch();

  const [editingAssessment, setEditingAssessment] =
    useState<IAssessment | null>(null);

  const [formData, setFormData] = useState({ discipline: "", grade: 0 });

  const assessments = useAppSelector((state) => state.assessments);
  const pagination = useAppSelector((state) => state.pagination);

  const initialPositionPage =
    pagination.rowsPerPage * (pagination.currentPage - 1);

  function handleRowsChangePage(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeRowsPerPage(parseInt(event.target.value)));
  }

  function handleChangePage(
    _: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) {
    dispatch(changePage(page + 1));
  }

  function handleDelete(id: string) {
    dispatch(deleteAssessmentThunk(id));
  }

  // Função que lida com as mudanças dos campos
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Clicou no botão de editar, seta no estado local a avalição
  function handleEdit(assessment: IAssessment) {
    setEditingAssessment(assessment);

    // Atualiza o estado do formulário para refletir nos campos os dados da avaliação
    setFormData({
      discipline: assessment.discipline,
      grade: assessment.grade,
    });
  }

  // Função para salvar a edição da avaliação
  function handleSave(assessment: IAssessment) {
    if (formData.discipline && formData.grade) {
      dispatch(
        updateAssessmentThunk({
          id: assessment.id,
          grade: Number(formData.grade),
          discipline: formData.discipline,
        })
      );
    }

    setEditingAssessment(null); // Reset após salvar
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Disciplina</TableCell>
            <TableCell>Nota</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assessments
            .slice(
              initialPositionPage,
              initialPositionPage + pagination.rowsPerPage
            )
            .map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.id}</TableCell>
                <TableCell>
                  {editingAssessment?.id === assessment.id ? (
                    <TextField
                      name="discipline"
                      value={formData.discipline}
                      onChange={handleChange}
                    />
                  ) : (
                    assessment.discipline
                  )}
                </TableCell>
                <TableCell>
                  {editingAssessment?.id === assessment.id ? (
                    <TextField
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      type="number"
                    />
                  ) : (
                    assessment.grade
                  )}
                </TableCell>
                <TableCell>
                  {editingAssessment?.id === assessment.id ? (
                    <IconButton onClick={() => handleSave(assessment)}>
                      <Save color="success" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(assessment)}>
                      <Edit color="primary" />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleDelete(assessment.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <TablePagination
                component="div"
                count={assessments.length}
                page={pagination.currentPage - 1}
                rowsPerPage={pagination.rowsPerPage}
                labelRowsPerPage="Avaliações por página"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from} - ${to} de ${count}`
                }
                rowsPerPageOptions={[2, 3, 5, 10]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsChangePage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
