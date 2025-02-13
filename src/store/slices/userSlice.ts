import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ILogin, IUser } from "../../types"
import { login } from "../../services/auth"
import { setLoading } from "./loadingSlice"

const initialState: IUser | null = null

export const loginRequest = createAsyncThunk('user/login', async (data: ILogin, config) => {
  config.dispatch(setLoading(true))

  const result = await login(data)

  config.dispatch(setLoading(false))

  return result
})

// pending -> andamento
// fulfilled -> concluída com sucesso
// rejected -> falhou

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as IUser | null,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginRequest.pending, () => {
      return null
    })  

    builder.addCase(loginRequest.fulfilled, (_, action) => {

      return action.payload
    })

    builder.addCase(loginRequest.rejected, () => {
      return null
    })  
  },
})

export default userSlice.reducer