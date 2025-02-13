import { api } from "./api";
import { ILogin } from "../types";

export async function login(data: ILogin) {
  try {
    const response = await api.post('/login', data)

    return response.data.data

  } catch (error) {
    console.log(error)
  }
}