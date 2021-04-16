export const setMinAmount = (minAmount) => ({
  type: "SET_MIN_AMOUNT",
  minAmount,
});

export const setMaxAmount = (maxAmount) => ({
  type: "SET_MAX_AMOUNT",
  maxAmount,
});

export const setStatus = (status) => ({
  type: "SET_STATUS",
  status,
});

export const setText = (text) => ({
  type: "SET_TEXT",
  text,
});

export const sortByLp = () => ({ type: "SORT_BY_LP" });

export const sortByName = () => ({ type: "SORT_BY_NAME" });

export const sortByDate = () => ({ type: "SORT_BY_DATE" });

export const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });

export const sortByStatus = () => ({ type: "SORT_BY_STATUS" });

export const sortBy = (sortBy) => ({
  type: "SORT_BY",
  sortBy,
});

export const setSortDirection = (isSortDesc) => ({
  type: "SET_SORT_DIRECTION",
  isSortDesc,
});
