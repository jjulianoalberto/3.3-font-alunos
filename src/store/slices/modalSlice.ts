import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    toggleModal: (state => !state)
  }
})

export const { toggleModal } = modalSlice.actions
export default modalSlice.reducer