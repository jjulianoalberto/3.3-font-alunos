export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  token?: string;
}

export interface IAssessment {
  id: string;
  discipline: string;
  grade: number;
  idStudent: string;
}

export interface IAssessmentResponse {
  id: string;
  token: string | undefined;
}
export interface IPagination {
  currentPage: number;
  rowsPerPage: number;
}

export interface ICreateAssessment {
  id: string;
  discipline: string;
  grade: number;
  token?: string;
}

export interface IAssessmentPayload {
  discipline: string;
  grade: number;
}
