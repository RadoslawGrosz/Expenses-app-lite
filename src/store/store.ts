import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import expensesReducer from "./expensesSlice";
import filterReducer from "./filterSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    filter: filterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
