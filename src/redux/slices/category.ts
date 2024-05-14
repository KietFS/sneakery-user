//utils and types
import { IProductCategory } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  currentCategory: IProductCategory | null
  listCategory: IProductCategory[]
}

const initialState: IInitialState = {
  currentCategory: null,
  listCategory: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCurrentProductCategory: (
      state,
      actions: PayloadAction<IProductCategory>,
    ) => {
      state.currentCategory = actions.payload
    },
    setListCategory: (state, actions: PayloadAction<IProductCategory[]>) => {
      state.listCategory = actions.payload
    },
  },
})

export const { setCurrentProductCategory, setListCategory } =
  categorySlice.actions
export default categorySlice.reducer
