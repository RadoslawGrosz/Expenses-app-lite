import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExpenseApi from "../api/ExpenseApi";
import { Expense } from "../types/Expense";

interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [],
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchAllExpenses",
  async () => {
    const response = await ExpenseApi.getExpenses();
    return response as Expense[];
  }
);

export const postExpense = createAsyncThunk(
  "expenses/postExpense",
  async (expense: Expense) => {
    const response = await ExpenseApi.postExpense(expense);
    return { ...expense, id: response } as Expense;
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    removeExpense: (state, action: PayloadAction<string | undefined>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      ExpenseApi.delExpense(action.payload);
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.forEach((expense) => {
        if (expense.id === action.payload.id) {
          if (action.payload.status) expense.status = action.payload.status;
          if (action.payload.description)
            expense.description = action.payload.description;
        }
      });
      ExpenseApi.editExpense(action.payload.id, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });
    builder.addCase(postExpense.fulfilled, (state, action) => {
      state.expenses.push(action.payload);
    });
  },
});

export const {
  setExpenses,
  // addExpense,
  removeExpense,
  editExpense,
} = expensesSlice.actions;

export default expensesSlice.reducer;
