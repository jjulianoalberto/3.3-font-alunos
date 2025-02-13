import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../types";

const initialState: IPagination = {
  currentPage: 1,
  rowsPerPage: 3,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    changeRowsPerPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    },
  },
});

export const { changePage, changeRowsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
