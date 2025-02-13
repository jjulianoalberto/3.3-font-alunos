import { ChangeEvent, MouseEvent } from "react";
import { Delete, Edit } from "@mui/icons-material";
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
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changePage,
  changeRowsPerPage,
} from "../../store/slices/paginationSlice";

export function TableAssessments() {
  const dispatch = useAppDispatch();

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
                <TableCell>{assessment.discipline}</TableCell>
                <TableCell>{assessment.grade}</TableCell>
                <TableCell>
                  <IconButton>
                    <Edit color="primary" />
                  </IconButton>

                  <IconButton>
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
