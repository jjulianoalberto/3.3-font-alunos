import { api } from "./api";
import {
  IAssessmentDelete,
  IAssessmentResponse,
  IAssessmentUpdate,
  ICreateAssessment,
} from "../types";

export async function getAssessments(data: IAssessmentResponse) {
  try {
    const response = await api.get(`/students/${data.id}/assessments`, {
      headers: {
        Authorization: data.token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function createAssessments(data: ICreateAssessment) {
  try {
    const newAssessment = {
      discipline: data.discipline,
      grade: data.grade,
    };

    const response = await api.post(
      `/student/${data.id}/assessments`,
      newAssessment,
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);

    return {};
  }
}

export async function deleteAssessment(data: IAssessmentDelete) {
  try {
    const response = await api.delete(
      `/students/${data.studentId}/assessments/${data.assessmentId}`,
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);

    return {};
  }
}

export async function updateAssessment(data: IAssessmentUpdate) {
  try {
    const updatedAssessment = {
      discipline: data.discipline,
      grade: data.grade,
    };

    const response = await api.put(
      `/students/${data.studentId}/assessments/${data.id}`,
      updatedAssessment,
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);

    return {};
  }
}
