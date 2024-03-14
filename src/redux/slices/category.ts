//utils and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  currentCategory: IProductCategory | null
}

const initialState: IInitialState = {
  currentCategory: null,
}

const categorySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentProductCategory: (
      state,
      actions: PayloadAction<IProductCategory>,
    ) => {
      state.currentCategory = actions.payload
    },
  },
})

export const { setCurrentProductCategory } = categorySlice.actions
export default categorySlice.reducer
