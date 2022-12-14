import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  brand: string[];
  size: string[];
  color: string[];
  category: string | null;
  condition: string | null;
  priceEnd: string | null;
  priceStart: string | null;
  sortType: string | null;
  keyWord: string | null;
}

const initialState: IInitialState = {
  brand: [],
  color: [],
  category: null,
  condition: null,
  size: [],
  priceStart: null,
  priceEnd: null,
  sortType: null,
  keyWord: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrand: (state, actions: PayloadAction<string[]>) => {
      state.brand = actions.payload;
    },
    setCategory: (state, actions: PayloadAction<string | null>) => {
      state.category = actions.payload;
    },
    setCondition: (state, actions: PayloadAction<string | null>) => {
      state.condition = actions.payload;
    },
    setSize: (state, actions: PayloadAction<string[]>) => {
      state.size = actions.payload;
    },
    setColor: (state, actions: PayloadAction<string[]>) => {
      state.color = actions.payload;
    },
    setPriceStart: (state, actions: PayloadAction<string | null>) => {
      state.priceStart = actions.payload;
    },
    setPriceEnd: (state, actions: PayloadAction<string | null>) => {
      state.priceEnd = actions.payload;
    },
    setSortType: (state, actions: PayloadAction<string | null>) => {
      state.sortType = actions.payload;
    },
    setKeyWord: (state, actions: PayloadAction<string | null>) => {
      state.keyWord = actions.payload;
    },
  },
});

export const {
  setBrand,
  setCategory,
  setCondition,
  setSize,
  setColor,
  setPriceEnd,
  setPriceStart,
  setSortType,
  setKeyWord,
} = filterSlice.actions;
export default filterSlice.reducer;
