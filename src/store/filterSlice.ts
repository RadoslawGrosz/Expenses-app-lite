import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusEnum } from "../types/Expense";
import { Filter, SortPropertiesEnum } from "../types/Filter";

interface FilterState {
  filter: Filter;
}

const initialState: FilterState = {
  filter: {
    minAmount: undefined,
    maxAmount: undefined,
    status: StatusEnum.All,
    text: "",
    sortBy: SortPropertiesEnum.Name,
    isSortDesc: true,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinAmount: (state, action: PayloadAction<number | undefined>) => {
      state.filter.minAmount = action.payload;
    },
    setMaxAmount: (state, action: PayloadAction<number | undefined>) => {
      state.filter.maxAmount = action.payload;
    },
    setStatus: (state, action: PayloadAction<StatusEnum>) => {
      state.filter.status = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.filter.text = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortPropertiesEnum>) => {
      if (action.payload === SortPropertiesEnum.Description) return state;
      if (state.filter.sortBy === action.payload) {
        state.filter.isSortDesc = !state.filter.isSortDesc;
      }
      state.filter.sortBy = action.payload;
    },
  },
});

export const {
  setMinAmount,
  setMaxAmount,
  setStatus,
  setText,
  setSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;
