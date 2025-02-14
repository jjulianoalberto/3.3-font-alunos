import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAssessment,
  IAssessmentPayload,
  TAssessmentPayload,
} from "../../types";
import { setLoading } from "./loadingSlice";
import { RootState } from "..";
import {
  createAssessments,
  deleteAssessment,
  getAssessments,
  updateAssessment,
} from "../../services/assessment";
import { Assessment } from "@mui/icons-material";

const initialState: IAssessment[] = [];

export const listAssessments = createAsyncThunk(
  "assessments/listAssessments",
  async (_, config) => {
    config.dispatch(setLoading(true));

    const { user } = config.getState() as RootState;

    if (!user) {
      return [];
    }

    const result = await getAssessments({
      id: user?.id,
      token: user?.token,
    });

    config.dispatch(setLoading(false));

    return result;
  }
);

export const createAssessmentsThunk = createAsyncThunk(
  "assessments/createAssessments",
  async ({ grade, discipline }: IAssessmentPayload, config) => {
    config.dispatch(setLoading(true));

    const { user } = config.getState() as RootState;

    if (!user) {
      return [];
    }

    const result = await createAssessments({
      grade,
      discipline,
      id: user.id,
      token: user.token,
    });

    config.dispatch(setLoading(false));

    return result;
  }
);

export const deleteAssessmentThunk = createAsyncThunk(
  "assessments/deleteAssessment",
  async (assessmentId: string, config) => {
    config.dispatch(setLoading(true));

    const { user } = config.getState() as RootState;

    if (!user || !user.token) {
      return [];
    }

    const result = await deleteAssessment({
      assessmentId,
      studentId: user.id,
      token: user.token,
    });

    config.dispatch(setLoading(false));

    return result;
  }
);

export const updateAssessmentThunk = createAsyncThunk(
  "assessments/updateAssessment",
  async ({ id, grade, discipline }: TAssessmentPayload, config) => {
    config.dispatch(setLoading(true));

    const { user } = config.getState() as RootState;

    if (!user || !user.token) {
      return [];
    }

    const result = await updateAssessment({
      id,
      grade,
      discipline,
      studentId: user.id,
      token: user.token,
    });

    config.dispatch(setLoading(false));

    return result;
  }
);

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(listAssessments.pending, () => {
      return [];
    });

    builder.addCase(listAssessments.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(listAssessments.rejected, () => {
      return [];
    });

    builder.addCase(createAssessmentsThunk.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(deleteAssessmentThunk.fulfilled, (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(updateAssessmentThunk.fulfilled, (state, action) => {
      return state.map((assessment) =>
        assessment.id === action.payload.id ? action.payload : assessment
      );
    });
  },
});

export default assessmentsSlice.reducer;
