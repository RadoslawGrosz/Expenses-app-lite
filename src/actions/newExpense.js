export const setName = (name) => ({
  type: "SET_NAME",
  name,
});

export const setDate = (date) => ({
  type: "SET_DATE",
  date,
});

export const setAmount = (amount) => ({
  type: "SET_AMOUNT",
  amount,
});

export const setImg = (img = {}) => ({
  type: "SET_IMG",
  img,
});

export const setStatus = (status) => ({
  type: "SET_NEW_EXPENSE_STATUS",
  status,
});

export const setVisibility = (isVisible) => ({
  type: "SET_VISIBILITY",
  isVisible,
});

export const setExpenseToDefault = () => ({
  type: "SET_EXPENSE_TO_DEFAULT",
});
