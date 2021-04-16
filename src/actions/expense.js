export const setExpenses = (expenses = []) => ({
  type: "SET_EXPENSES",
  expenses,
});

export const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const editExpense = (id, status, description) => ({
  type: "EDIT_EXPENSE",
  id,
  status,
  description,
});
