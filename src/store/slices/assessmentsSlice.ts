import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAssessment, IAssessmentPayload } from "../../types";
import { setLoading } from "./loadingSlice";
import { RootState } from "..";
import { createAssessments, getAssessments } from "../../services/assessment";

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
  "assessments/createAsessments",
  async ({ grade, discipline }: IAssessmentPayload, config) => {
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

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    addAssessment: (state, action: PayloadAction<IAssessment>) => {
      state.push(action.payload);
    },
    deleteAssessment: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(
        (assesment) => assesment.id === action.payload
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
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
  },
});

export const { addAssessment, deleteAssessment } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;
