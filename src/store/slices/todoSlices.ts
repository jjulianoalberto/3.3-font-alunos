import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodo {
  id: number
  title: string
}

const initialState: ITodo[] = [
  {
    id: 1,
    title: 'Fazer café'
  },
  {
    id: 2,
    title: 'Comprar pão'
  }
]

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.push(action.payload)
    }
  }
})

export const { addTodo } = todoSlice.actions
export default todoSlice.reducer
