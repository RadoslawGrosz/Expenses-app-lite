import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import expensesReducer from "../reducers/expensesReducer";
import filtersReducer from "../reducers/filtersReducer";
import newExpenseFormReducer from "../reducers/newExpenseFormReducer";

const store = () => {
  const storeConfig = createStore(
    combineReducers({
      user: userReducer,
      expenses: expensesReducer,
      filters: filtersReducer,
      newExpense: newExpenseFormReducer,
    })
  );
  return storeConfig;
};

export default store;
